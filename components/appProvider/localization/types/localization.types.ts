export interface IDialogText {
  submit: string;
}

export interface ILoginInput {
  placeholder: string;
  label: string;
}

export interface IDashboardText {
  title: string;
}

export interface ILoginText {
  title: string;
  input: ILoginInput;
}

export interface LocaleText {
  login: ILoginText;
  dialog: IDialogText;
}
