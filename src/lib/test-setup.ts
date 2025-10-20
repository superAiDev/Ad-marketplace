import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/supabase';

async function testDatabase() {
  // Create Supabase client
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log('🔍 Testing database setup...\n');

  try {
    // 1. Test categories
    console.log('Testing categories...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*');
    
    if (catError) throw catError;
    console.log(`✅ Found ${categories.length} categories`);

    // 2. Test user registration
    console.log('\nTesting user registration...');
    const testEmail = `test_${Date.now()}@example.com`;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: testEmail,
      password: 'test123456'
    });
    
    if (authError) throw authError;
    console.log('✅ User registration successful');

    // 3. Test profile creation
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select()
      .eq('id', authData.user!.id)
      .single();
    
    if (profileError) throw profileError;
    console.log('✅ Profile created automatically');

    // 4. Test ad creation
    console.log('\nTesting ad creation...');
    const { data: ad, error: adError } = await supabase
      .from('ads')
      .insert({
        title: 'Test Ad',
        description: 'This is a test ad',
        slug: `test-ad-${Date.now()}`,
        category_id: categories[0].id,
        price: 100,
        owner: authData.user!.id,
        status: 'published',
        location: { city: 'Tehran', state: 'Tehran' },
        contact_info: { email: testEmail }
      })
      .select()
      .single();
    
    if (adError) throw adError;
    console.log('✅ Ad created successfully');

    // 5. Test search function
    console.log('\nTesting search function...');
    const { data: searchResults, error: searchError } = await supabase
      .rpc('search_ads', {
        search_query: 'test',
        category_slug: null,
        price_min: null,
        price_max: null,
        city: null
      });
    
    if (searchError) throw searchError;
    console.log('✅ Search function working');

    // 6. Test bookmark creation
    console.log('\nTesting bookmarks...');
    const { error: bookmarkError } = await supabase
      .from('bookmarks')
      .insert({
        user_id: authData.user!.id,
        ad_id: ad.id
      });
    
    if (bookmarkError) throw bookmarkError;
    console.log('✅ Bookmark created successfully');

    // 7. Test user stats
    console.log('\nTesting user stats...');
    const { data: stats, error: statsError } = await supabase
      .rpc('get_user_stats', {
        user_id: authData.user!.id
      });
    
    if (statsError) throw statsError;
    console.log('✅ User stats retrieved successfully');
    console.log(stats);

    // Clean up
    console.log('\nCleaning up test data...');
    await supabase.from('ads').delete().eq('id', ad.id);
    await supabase.auth.admin.deleteUser(authData.user!.id);
    console.log('✅ Cleanup completed');

    console.log('\n✨ All tests passed successfully!');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

testDatabase();