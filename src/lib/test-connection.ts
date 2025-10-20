import supabase from './supabaseClient';

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('categories').select('count');
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Connection successful!');
    console.log('Categories count:', data);
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();