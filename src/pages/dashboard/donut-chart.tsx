import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Others", value: 71, color: "#22C55E" },       // Green
    { name: "Onboarding", value: 27, color: "#FACC15" },   // Yellow
    { name: "Offboarding", value: 23, color: "#3B82F6" },  // Blue
];

const total = data.reduce((acc, cur) => acc + cur.value, 0);

export default function EmployeeDonutChart() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex items-center flex-col gap-4">
      {/* Chart */}
      <div className="relative w-48 h-48 ">
        <ResponsiveContainer >
          <PieChart className="z-[5]">
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  cursor="pointer"
                  className="origin-center outline-none transition-transform duration-250
                ease-out hover:scale-105 focus:outline-none"
                />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip
              formatter={(value, name, props) => [`${value}`, `${props.payload.name}`]}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                padding: "6px 10px",
              }}
              cursor={false}
              labelStyle={{display: "none"}}

            />
          </PieChart>
        </ResponsiveContainer>

        {/* Centered Text area */}
        <div className="absolute inset-0 z-[1] rounded-full w-24 border-3 border-chart-piechart bg-background shadow-md top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-gray-500 text-sm">Total Emp.</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className=" text-sm">{item.name}</span>
            <span className="ml-auto font-medium text-sm">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
