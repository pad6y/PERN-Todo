function SortButton({ handler }) {
  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-primary mt-2 center" onClick={handler}>
        SORT BY
      </button>
    </div>
  );
}
export default SortButton;
