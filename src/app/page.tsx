import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, BarChart3, Users, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your social commerce hub.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+54</div>
            <p className="text-xs text-muted-foreground">+12 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2k</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">PD</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Published "Summer Dress"</p>
                  <p className="text-xs text-muted-foreground">To Facebook, Instagram</p>
                </div>
                <div className="text-sm text-muted-foreground">2m ago</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">PD</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Published "Leather Wallet"</p>
                  <p className="text-xs text-muted-foreground">To All Platforms</p>
                </div>
                <div className="text-sm text-muted-foreground">1h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Views by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-[100px] text-sm font-medium">Facebook</div>
                <div className="flex-1 relative h-2 bg-muted rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-blue-600 w-[70%] rounded-full"></div>
                </div>
                <div className="w-[50px] text-right text-sm">70%</div>
              </div>
              <div className="flex items-center">
                <div className="w-[100px] text-sm font-medium">Instagram</div>
                <div className="flex-1 relative h-2 bg-muted rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-pink-600 w-[55%] rounded-full"></div>
                </div>
                <div className="w-[50px] text-right text-sm">55%</div>
              </div>
              <div className="flex items-center">
                <div className="w-[100px] text-sm font-medium">TikTok</div>
                <div className="flex-1 relative h-2 bg-muted rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-black dark:bg-white w-[85%] rounded-full"></div>
                </div>
                <div className="w-[50px] text-right text-sm">85%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
