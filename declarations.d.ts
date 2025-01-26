declare module '*.jpg' {
    const jpg: string;
    export default jpg;
  }
  
  declare module '*.png' {
    const value: string;
    export default value;
  }
  
  declare module '*.svg' {
    const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    const content: string;
    export { ReactComponent };
    export default content;
  }
  
  declare module '*.gif' {
    const value: string;
    export default value;
  }
  
  declare module '*.webp' {
    const value: string;
    export default value;
  }
  