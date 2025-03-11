
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BotActivity {
  id: string;
  botId: string;
  botName: string;
  botType: string;
  messages: number;
  tokens: number;
  success: number;
  failure: number;
  timestamp: string;
}

// Sample data for the chart
const generateActivityData = (days: number = 7) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    data.push({
      day,
      leader: Math.floor(Math.random() * 100) + 50,
      knowledge: Math.floor(Math.random() * 80) + 30,
      reasoning: Math.floor(Math.random() * 70) + 20,
      data: Math.floor(Math.random() * 60) + 10,
    });
  }
  
  return data;
};

const BotActivity = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [activityData, setActivityData] = useState(generateActivityData(7));
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    
    // Update data based on selected time range
    switch (value) {
      case "day":
        setActivityData(generateActivityData(1));
        break;
      case "week":
        setActivityData(generateActivityData(7));
        break;
      case "month":
        setActivityData(generateActivityData(30));
        break;
      default:
        setActivityData(generateActivityData(7));
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Activity</CardTitle>
        <CardDescription>
          Number of messages processed by each bot
        </CardDescription>
        <div className="mt-2">
          <Tabs value={timeRange} onValueChange={handleTimeRangeChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={activityData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="leader" stroke="#f59e0b" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="knowledge" stroke="#8b5cf6" />
            <Line type="monotone" dataKey="reasoning" stroke="#3b82f6" />
            <Line type="monotone" dataKey="data" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BotActivity;
