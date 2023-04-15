export interface IFloatingActionButtonProps {
  children: React.ReactNode;
  title: string;
  position: "right" | "left";
  bgColor: "primary" | "red" | "green";
  handleOpenModal: () => void;
}
