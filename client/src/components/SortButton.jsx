function SortButton({ handler, by }) {
  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-primary mt-2 center" onClick={handler}>
        SORT BY {by}
      </button>
    </div>
  );
}
export default SortButton;
