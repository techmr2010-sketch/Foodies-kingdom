
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee, Package, PackageCheck, PackageX, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type Order = {
    id: string;
    date: string;
    total: number;
    items: { name: string; quantity: number }[];
    status: 'Pending' | 'Delivered';
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
}

const processOrderDataForChart = (orders: Order[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return format(d, 'yyyy-MM-dd');
    }).reverse();

    const dailyData = last7Days.map(day => {
        const ordersOnDay = orders.filter(o => format(new Date(o.date), 'yyyy-MM-dd') === day);
        const revenue = ordersOnDay.reduce((sum, o) => sum + o.total, 0);
        return {
            date: format(new Date(day), 'MMM d'),
            orders: ordersOnDay.length,
            revenue: revenue,
        };
    });

    return dailyData;
};

export default function DashboardPage() {
    const { user, openSignUpModal } = useUser();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (user) {
            try {
                const storedOrders = localStorage.getItem(`orders-${user.phone}`);
                if (storedOrders) {
                    setOrders(JSON.parse(storedOrders));
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("Failed to load orders from localStorage", error);
                setOrders([]);
            }
        }
    }, [user]);

    if (!isClient) {
        return null; // Or a loading spinner
    }

    if (!user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
                    <UserIcon className="h-24 w-24 text-muted-foreground mb-4" />
                    <h1 className="text-3xl font-bold mb-2">Please Sign In</h1>
                    <p className="text-muted-foreground mb-6">You need to be signed in to view the dashboard.</p>
                    <Button onClick={openSignUpModal}>Sign Up / Sign In</Button>
                </main>
                <Footer />
            </div>
        );
    }
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const chartData = processOrderDataForChart(orders);
    const recentOrders = orders.slice(0, 5);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrders}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Delivered Orders</CardTitle>
                            <PackageCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{deliveredOrders}</div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                            <PackageX className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pendingOrders}</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 md:grid-cols-5">
                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Orders in the Last 7 Days</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))'
                                        }}
                                    />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="orders" fill="hsl(var(--primary))" name="Orders" />
                                    <Bar yAxisId="right" dataKey="revenue" fill="hsl(var(--accent))" name="Revenue (₹)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            <Badge variant={order.status === 'Delivered' ? 'secondary' : 'default'}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {recentOrders.length === 0 && (
                                <p className="text-center text-muted-foreground py-8">No recent orders found.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
