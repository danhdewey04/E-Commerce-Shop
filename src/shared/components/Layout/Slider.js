import React, { useEffect, useState } from "react";
import { getSliders } from "../../../services/Api";
import { SLIDER_LIMIT } from "../../constants/config";
import { getImageSlider } from "../../ultils";

const Slider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getSliders({ params: { limit: SLIDER_LIMIT, sort: 1 } })
      .then(({ data }) => {
        const s = data.data || [];
        try {
          console.log("[Slider] fetched slides ->", s.map((it) => it && (it.image || it.src || it.url)));
        } catch (e) {}
        setSlides(s);
      })
      .catch(() => {});
  }, []);

  return (
    <div id="slide" className="carousel slide" data-ride="carousel">
      <ul className="carousel-indicators">
        {(slides.length ? slides : Array.from({ length: SLIDER_LIMIT })).map((_, idx) => (
          <li key={idx} data-target="#slide" data-slide-to={idx} className={idx === 0 ? "active" : ""} />
        ))}
      </ul>
      <div className="carousel-inner">
        {(slides.length ? slides : [1,2,3]).map((item, idx) => {
          const raw = item && (item.image || item.src || item.url);
          const resolve = (p) => {
            if (!p) return p;
            if (/^https?:\/\//i.test(p)) return p; // full URL
            if (!p.includes("/")) return getImageSlider(p);
            if (p.startsWith("/")) return p; // already absolute
            return `/${p}`; // relative path with slashes -> prefix slash
          };
          const src = raw ? resolve(raw) : `/images/slide-${idx + 1}.png`;
          const fallback = `/images/slide-${(idx % SLIDER_LIMIT) + 1}.png`;
          return (
            <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
              <img
                className="d-block w-100"
                src={src}
                alt={item && item.title ? item.title : ""}
                onError={(e) => {
                  if (e && e.target) e.target.src = fallback;
                }}
              />
            </div>
          );
        })}
      </div>
      <a className="carousel-control-prev" href="#slide" data-slide="prev">
        <span className="carousel-control-prev-icon" />
      </a>
      <a className="carousel-control-next" href="#slide" data-slide="next">
        <span className="carousel-control-next-icon" />
      </a>
    </div>
  );
};

export default Slider;
