import React, { useState , useEffect , useRef } from "react";
import { PreviewResponse } from "./Create";
import axios from "axios";
import DatePicker from "./DatePicker";

const ProgramButton = ({preview}: {preview: PreviewResponse}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla la visibilidad del Datepicker
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datepickerRef = useRef<HTMLDivElement>(null);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Oculta el Datepicker después de seleccionar una fecha
    setToastMessage(`Tu publicación ha sido programada con éxito el día ${selectedDate?.toLocaleDateString()}`);
    setShowToast(true); // Muestra el toast

  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datepickerRef.current &&
        !datepickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false); // Cierra el Datepicker si se hace clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpia el evento al desmontar
    };
  }, []);

  return (
    <div className="container mt-3 buttons">
      <div className="d-flex flex-direction-row justify-content-between w-100 p-3">
      <button 
         className="btn btn-primary w-100"
        onClick={toggleDatePicker}
      >
       Programar
      </button>

      {showDatePicker && (
        <div className="mt-3" style={{ position: "absolute", zIndex: 1050 }} ref={datepickerRef}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            inline // Muestra el datepicker en el contenedor
          />
        </div>
      )}

      {selectedDate && (
        <div className="mt-3">
          {/* <strong>Fecha seleccionada:</strong> {selectedDate.toLocaleDateString()} */}

        </div>
      )}
    </div>

      {/* Toast Notification */}
      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1055 }}
      >
        <div
          className={`toast align-items-center text-bg-light ${
            showToast ? "show" : ""
          }`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              onClick={() => setShowToast(false)}
              aria-label="Cerrar"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramButton;
