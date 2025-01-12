import React from "react";

type DateRangePickerProps = {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
        marginBottom: "10px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "5px",
          color: "#333333",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        Select Date Range
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #cccccc",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            color: "#333333",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#cccccc")}
        />
        <span
          style={{
            fontSize: "14px",
            color: "#666666",
          }}
        >
          to
        </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange(startDate, e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #cccccc",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            color: "#333333",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
          onBlur={(e) => (e.target.style.borderColor = "#cccccc")}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
