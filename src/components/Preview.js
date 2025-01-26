import React from "react";

const Preview = ({ preview }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm w-100" style={{ maxWidth: '400px' }}>
      <h1 className="text-center mb-4">Vista previa del Post</h1>
      {preview ? (
        <pre className="bg-light p-3 rounded" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {JSON.stringify(preview, null, 2)}
        </pre>
      ) : (
        <p className="text-center text-muted">Aquí verás tu post generado por IA</p>
      )}
    </div>
  );
};

export default Preview;
