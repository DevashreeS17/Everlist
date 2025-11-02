export default function Gallery({ galleryItems = [], openAdd }) {
  return (
    <aside className="gallery">
      <h3>Gallery</h3>
      <div className="images">
        {galleryItems.map((it, i) => (
          <figure key={i} className="gallery-item">
            {it.image ? (
              <img src={it.image} alt={it.caption} style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }} />
            ) : (
              <div className="thumb" />
            )}
            <figcaption>{it.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-actions">
        <button className="open-add" onClick={openAdd}>Add Goal</button>
      </div>
    </aside>
  );
}