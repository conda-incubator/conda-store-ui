interface IConfig {
  styleType: string;
}

export const config: IConfig = {
  styleType: process.env.REACT_APP_STYLE_TYPE || "green-accent"
};
