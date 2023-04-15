export interface IModalComponentProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  title?: string;
  children: React.ReactNode;
}
