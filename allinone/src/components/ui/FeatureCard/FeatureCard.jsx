export default function FeatureCard({ title, subtitle, btnText, img }) {
  return (
    <div className="p-2"> {/* 👈 controlled spacing */}
      <div className="card shadow-sm h-100 border-0">
        
        <img
          src={img}
          className="card-img-top"
          style={{
            height: "180px",
            objectFit: "cover",
          }}
        />

        <div className="card-body text-center d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold">{title}</h5>
            <p className="text-muted">{subtitle}</p>
          </div>

          <button className="btn btn-success mt-2">
            {btnText}
          </button>
        </div>

      </div>
    </div>
  );
}