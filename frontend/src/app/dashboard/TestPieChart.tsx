import React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

const testData = [
  { name: 'Product A', value: 120 },
  { name: 'Product B', value: 80 }
];

const colors = ["#00C49F", "#0088FE"];

const TestPieChart = () => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={testData}
            innerRadius={50}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
          >
            {testData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TestPieChart;