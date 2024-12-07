"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ProtectedRoute } from "@/components/protected-route"

// Mock data for the chart
const mockData = [
    { date: "2023-01-01", cholesterol: 180, glucose: 95, tsh: 2.5 },
    { date: "2023-02-01", cholesterol: 190, glucose: 100, tsh: 2.7 },
    { date: "2023-03-01", cholesterol: 185, glucose: 98, tsh: 2.6 },
    { date: "2023-04-01", cholesterol: 195, glucose: 102, tsh: 2.8 },
    { date: "2023-05-01", cholesterol: 188, glucose: 97, tsh: 2.5 },
    { date: "2023-06-01", cholesterol: 192, glucose: 99, tsh: 2.7 },
]

export default function Dashboard() {
    const [parameter, setParameter] = useState("cholesterol")
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

    const filteredData = dateRange
        ? mockData.filter(
            (item) =>
                new Date(item.date) >= dateRange.from && new Date(item.date) <= dateRange.to
        )
        : mockData

    const handleExport = () => {
        // Here you would implement the logic to export the data
        console.log("Exporting data:", filteredData)
    }

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Health Trends Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Parameter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Select value={parameter} onValueChange={setParameter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select parameter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cholesterol">Cholesterol</SelectItem>
                                    <SelectItem value="glucose">Glucose</SelectItem>
                                    <SelectItem value="tsh">TSH</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Date Range</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DatePickerWithRange />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Export</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleExport}>Export Data</Button>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{parameter.charAt(0).toUpperCase() + parameter.slice(1)} Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={filteredData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey={parameter} stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    )
}

