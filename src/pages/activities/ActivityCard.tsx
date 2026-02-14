import React from 'react';
import { Calendar, MapPin, Video, Users, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

interface ActivityCardProps {
  id: string;
  title: string;
  type: 'online' | 'local';
  date: string;
  instructor: string;
  venue?: string;
  platform?: string;
  capacity: number;
  enrolled: number;
  weatherDependent?: boolean;
  equipment?: string[];
  onEdit: (id: string) => void;
  onCancel: (id: string) => void;
}

const ActivityCard = ({
  id,
  title,
  type,
  date,
  instructor,
  venue,
  platform,
  capacity,
  enrolled,
  weatherDependent,
  equipment,
  onEdit,
  onCancel,
}: ActivityCardProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{title}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    type === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {type}
                </span>
                {weatherDependent && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    Weather Dependent
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                <Calendar className="inline-block h-4 w-4 mr-1" />
                {new Date(date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                {enrolled}/{capacity}
              </span>
            </div>
          </div>

          <div className="text-sm">
            <p className="flex items-center gap-2 text-gray-600">
              {type === 'online' ? (
                <>
                  <Video className="h-4 w-4" />
                  Platform: {platform}
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  Venue: {venue}
                </>
              )}
            </p>
            <p className="text-gray-600">Instructor: {instructor}</p>
          </div>

          {equipment && equipment.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {equipment.map(item => (
                <span key={item} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={() => onEdit(id)} className="flex-1 px-3 py-1 text-sm border rounded hover:bg-gray-50">
              Edit
            </button>
            <button
              onClick={() => onCancel(id)}
              className="flex-1 px-3 py-1 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
