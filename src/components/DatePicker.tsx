import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface DatepickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  placeholder?: string;
}

const DatepickerExample: React.FC<DatepickerProps> = ({
  selectedDate,
  onDateChange,
  placeholder = "Selecciona una fecha",
}) => {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange} // Manejador proporcionado por el padre
        className="form-control"
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText={placeholder}
      />
    </div>
  );
};

export default DatePicker;
