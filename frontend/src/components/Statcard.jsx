import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const StatCard = ({ title, value, icon: Icon, color = "green", trend, subtitle }) => {
  const colors = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}>
              {trend > 0 ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
              {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;