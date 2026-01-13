import React, { useEffect, useState } from "react";
import { getBanners } from "../../../services/Api";
import { BANNER_LIMIT } from "../../constants/config";
import { getImageBanner } from "../../ultils";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners({ params: { limit: BANNER_LIMIT, sort: 1 } })
      .then(({ data }) => {
        const b = data.data || [];
        try {
          console.log("[Banner] fetched banners ->", b.map((it) => it && (it.image || it.src || it.url)));
        } catch (e) {}
        setBanners(b);
      })
      .catch(() => {});
  }, []);

  return (
    <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
      <div id="banner">
        {banners && banners.length
          ? banners.map((item, idx) => {
              const raw = item && (item.image || item.src || item.url);
              const resolve = (p) => {
                if (!p) return p;
                if (/^https?:\/\//i.test(p)) return p;
                if (!p.includes("/")) return getImageBanner(p);
                if (p.startsWith("/")) return p;
                return `/${p}`;
              };
              const src = raw ? resolve(raw) : `images/banner-${idx + 1}.png`;
              return (
                <div className="banner-item" key={idx}>
                  <a href={item.link || "#"}>
                    <img className="img-fluid" src={src} alt={item && item.title ? item.title : ""} />
                  </a>
                </div>
              );
            })
          : [1, 2, 3, 4, 5, 6].map((i) => (
              <div className="banner-item" key={i}>
                <a href="#">
                  <img className="img-fluid" src={`images/banner-${i}.png`} />
                </a>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Banner;