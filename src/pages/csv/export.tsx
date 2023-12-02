import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { format } from 'date-fns';
import { NextPage } from 'next';


const UserExport: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleExport = async () => {
    try {
      // Format the dates as 'yyyy/M/d' to send in the request
      const formattedStart = format(startDate, 'yyyy/M/d');
      const formattedEnd = format(endDate, 'yyyy/M/d');

      // Send the request to the backend
      const response = await axios.get(`/api/exportUsers?start=${formattedStart}&end=${formattedEnd}`, { responseType: 'blob' });

      // Create a blob link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting users:', error);
    }
  };

  return (
    <div>
      <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date)} />
      <button onClick={handleExport}>Export Users</button>
    </div>
  );
};

export default UserExport;
