import React from 'react';
import { SafeComponent } from '../wrapper/SafeReact';
import { Cloud, Wind, Sun, CloudRain, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface WeatherCondition {
  type: 'sunny' | 'cloudy' | 'rainy' | 'windy';
  temperature: number;
  windSpeed: number;
  precipitation: number;
  visibility: number;
  suitable: boolean;
}

interface WeatherAlertProps {
  activityName: string;
  location: string;
  date: string;
  conditions: WeatherCondition;
  requirements: {
    maxWindSpeed?: number;
    minVisibility?: number;
    maxPrecipitation?: number;
  };
  onReschedule?: () => void;
}

const WeatherAlert = ({ activityName, location, date, conditions, requirements, onReschedule }: WeatherAlertProps) => {
  const getWeatherIcon = (type: WeatherCondition['type']) => {
    switch (type) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'windy':
        return <Wind className="h-6 w-6 text-blue-400" />;
    }
  };

  const getAlertMessage = () => {
    if (conditions.windSpeed > (requirements.maxWindSpeed || 0)) {
      return 'Wind speed exceeds safety limit';
    }
    if (conditions.visibility < (requirements.minVisibility || 0)) {
      return 'Visibility below required minimum';
    }
    if (conditions.precipitation > (requirements.maxPrecipitation || 0)) {
      return 'Precipitation too high for safe operation';
    }
    return 'Weather conditions are suitable';
  };

  return (
    <Card className={conditions.suitable ? 'bg-green-50' : 'bg-yellow-50'}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {conditions.suitable ? (
            <Sun className="h-5 w-5 text-green-500" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          )}
          Weather Alert - {activityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date(date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: getWeatherIcon(conditions.type), label: 'Conditions', value: conditions.type },
              { icon: <Wind className="h-5 w-5" />, label: 'Wind', value: `${conditions.windSpeed} km/h` },
              { icon: <Cloud className="h-5 w-5" />, label: 'Visibility', value: `${conditions.visibility} km` },
              {
                icon: <CloudRain className="h-5 w-5" />,
                label: 'Precipitation',
                value: `${conditions.precipitation}%`,
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`p-3 rounded-lg ${
              conditions.suitable ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {getAlertMessage()}
          </div>

          {!conditions.suitable && onReschedule && (
            <button
              onClick={onReschedule}
              className="w-full px-4 py-2 bg-white border border-yellow-200 text-yellow-800 rounded hover:bg-yellow-50"
            >
              Reschedule Activity
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SafeComponent(WeatherAlert);

export default WeatherAlert;
