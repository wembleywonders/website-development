import React from 'react';

interface BookingProps {
 workshopId: string;
 title: string;
 price: number;
}

const EventbriteBooking: React.FC<BookingProps> = ({ workshopId, title, price }) => {
 const handleBooking = () => {
   // Redirect to Eventbrite or simple booking form
   window.location.href = `https://eventbrite.com/e/${workshopId}`;
 };

 return (
   <div className="booking-widget">
     <button onClick={handleBooking} className="btn btn-primary">
       Book {title} - £{price}
     </button>
   </div>
 );
};

export default EventbriteBooking;
