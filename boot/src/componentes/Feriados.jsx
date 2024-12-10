import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Função para calcular a data da Páscoa
const calculateEaster = (year) => {
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
};

// Função para calcular os feriados
const calculateHolidays = (year) => {
  const easter = calculateEaster(year);
  const holidays = [
    { date: new Date(year, 0, 1), name: "Confraternização Universal" },
    { date: new Date(easter.getTime() - 47 * 24 * 60 * 60 * 1000), name: "Carnaval" },
    { date: new Date(easter), name: "Páscoa" },
    { date: new Date(easter.getTime() - 2 * 24 * 60 * 60 * 1000), name: "Sexta-feira Santa" },
    { date: new Date(easter.getTime() + 60 * 24 * 60 * 60 * 1000), name: "Corpus Christi" },
    { date: new Date(year, 3, 21), name: "Tiradentes" },
    { date: new Date(year, 4, 1), name: "Dia do Trabalho" },
    { date: new Date(year, 8, 7), name: "Independência do Brasil" },
    { date: new Date(year, 9, 12), name: "Nossa Senhora Aparecida" },
    { date: new Date(year, 10, 2), name: "Finados" },
    { date: new Date(year, 10, 15), name: "Proclamação da República" },
    { date: new Date(year, 11, 25), name: "Natal" },
  ];
  return holidays;
};

const HolidayModal = () => {
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [year, setYear] = useState(new Date().getFullYear());
  const holidays = calculateHolidays(year);

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (
    <div style={{ backgroundColor: "#000", color: "#0f0", minHeight: "100vh", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Calendário de Feriados</h1>
        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)} // Abre o modal
        >
          Ver Feriados
        </button>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ backgroundColor: "#000", color: "#0f0" }}>
              <div className="modal-header">
                <h5 className="modal-title">Feriados Nacionais - {year}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)} // Fecha o modal
                  style={{ filter: "invert(1)" }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-between mb-3">
                  <button className="btn btn-outline-success" onClick={handlePrevYear}>
                    &lt; Ano Anterior
                  </button>
                  <button className="btn btn-outline-success" onClick={handleNextYear}>
                    Ano Seguinte &gt;
                  </button>
                </div>
                <table className="table table-dark table-bordered">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Feriado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holidays.map((holiday, index) => (
                      <tr key={index}>
                        <td>{holiday.date.toLocaleDateString()}</td>
                        <td style={{ color: holiday.name === "Natal" ? "red" : "#0f0" }}>
                          {holiday.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)} // Fecha o modal
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayModal;
