import { CatItemProps } from "./CatItem";

const CatPage: React.FC<CatItemProps> = (props: CatItemProps) => {
  return (
    <>
      <h1>{`Welcome to ${props.cat.catName}s page!`}</h1>
    </>
  );
};

export default CatPage;
