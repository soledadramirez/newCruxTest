import React from "react";

interface InputFormProps {
  text: string;
  setText: (value: string) => void;
  url: string;
  setUrl: (value: string) => void;
  file: File | null;
  setFile: (file: File) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ text, setText, url, setUrl, file, setFile, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-sm w-100 w-md-25 d-flex flex-column justify-content-around"
      // style={{ maxWidth: '400px' }}
    >
      <h1 className="text-center mb-4">NewCrux</h1>

      <div className="mb-3">
        <label htmlFor="text" className="form-label">Agregá texto:</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="url" className="form-label">Agregá una URL:</label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="file" className="form-label">Agregá un archivo:</label>
        <input
          type="file"
          id="file"
          onChange={(e: any) => setFile(e.target.files[0])}
          className="form-control"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Enviar
      </button>
    </form>
  );
};

export default InputForm;
