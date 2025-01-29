import React from "react";

interface InputFormProps {
  text: string;
  setText: (value: string) => void;
  url: string;
  setUrl: (value: string) => void;
  file: File | null;
  setFile: (file: File) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) =>void;
}

const CreateForm = ({ text, setText, url, setUrl, file, setFile, handleSubmit, isLoading, setIsLoading}: InputFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-sm w-100 w-md-25 d-flex flex-column justify-content-around"
      // style={{ maxWidth: '400px' }}
    >
      <h2 className="text-center mb-3">NewCrux</h2>
      <h6 className="m-0">
      Esta información nos ayudará a crear tu post
    </h6>
<div className="card shadow w-100" style={{ maxWidth: '500px', margin: '20px auto' }}>
  <div className="card-body w-100">
    <div className="mb-3" style={{alignSelf: 'flex-end',}}>
      <label htmlFor="text" className="form-label">Agregá texto:</label>
      <textarea
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
    {/* <div className="mb-3">
      <label htmlFor="file" className="form-label">Agregá un archivo:</label>
      <input
        type="file"
        id="file"
        onChange={(e: any) => setFile(e.target.files[0])}
        className="form-control"
      />
    </div> */}
  </div>
</div>

      <div>
        <h6 className="">Opcional: Incluir imagen en el post</h6>
        <div className="">
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="file" className="form-label">Agregá una imagen:</label>
            <input
              type="file"
              id="file"
              onChange={(e: any) => setFile(e.target.files[0])}
              className="form-control"
            />
          </div>
          <button
          type="submit"
          className="btn btn-outline-primary mb-3"
          style={{height: '40px'}}
        >
          Generar imagen con IA
        </button>
        </div>
      </div>

      <button
          type="submit"
          className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
          disabled={isLoading} // Botón deshabilitado mientras se carga
          >
          {isLoading ? (
          <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          ></span>
          Generando...
          </>
            ) : (
              "Generar post"
            )}
       </button>
    </form>
  );
};

export default CreateForm;
