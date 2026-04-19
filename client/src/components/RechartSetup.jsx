import React from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

function RechartSetup({ charts }) {
  if (!charts || charts.length === 0) {
    return <p className="text-center">No charts available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {charts.map((chart, index) => {
        const { type, data, title } = chart;

    
        const keys = data && data.length > 0 ? Object.keys(data[0]) : [];
        const xKey = keys[0];     // label
        const dataKey = keys[1];  // value

        return (
          <div
            key={index}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-3 text-center">
              {title}
            </h2>

            <div className="w-full h-80">
              <ResponsiveContainer>

                
                {type === "line" && (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={dataKey}
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                )}

            
                {type === "bar" && (
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey={dataKey}
                      fill="#82ca9d"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                )}

                
                {type === "pie" && (
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={data}
                      dataKey={dataKey}
                      nameKey={xKey}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                )}

              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RechartSetup;