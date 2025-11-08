export function InputColumn({
  titleValue,
  descriptionValue,
  onTitleChange,
  onDescriptionChange,
}) {
  return (
    <div className="input_column">
      <input
        type="text"
        placeholder="Название"
        value={titleValue}
        onChange={onTitleChange}
      />
      <input
        type="text"
        placeholder="Описание"
        value={descriptionValue}
        onChange={onDescriptionChange}
      />
    </div>
  );
}
