import Link from "next/link"
import { MapPin, Clock } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ad } from "@/lib/types" // We'll create this type later

interface AdCardProps {
  ad: Ad
  featured?: boolean
}

export function AdCard({ ad, featured = false }: AdCardProps) {
  return (
    <Link href={`/services/${ad.category_slug}/${ad.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        {ad.images?.[0] && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={ad.images[0]}
              alt={ad.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {featured && (
              <Badge
                className="absolute right-2 top-2"
                variant="secondary"
              >
                ویژه
              </Badge>
            )}
          </div>
        )}
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-2 text-base">
            {ad.title}
          </CardTitle>
          <CardDescription>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              {ad.price ? (
                <span className="font-medium text-green-600 dark:text-green-400">
                  {new Intl.NumberFormat("fa-IR", {
                    style: "currency",
                    currency: "IRR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(ad.price)}
                </span>
              ) : (
                <span className="text-muted-foreground">توافقی</span>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {ad.location?.city && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{ad.location.city}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <time dateTime={ad.created_at}>
                {new Intl.DateTimeFormat("fa-IR", {
                  month: "long",
                  day: "numeric",
                }).format(new Date(ad.created_at))}
              </time>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}