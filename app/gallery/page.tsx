"use client";

import React, { useEffect, useRef, useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";

const ImageGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=100")
      .then(res => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (!galleryRef.current || data.length === 0) return;

    let instance: any;

    (async () => {
      const { default: fjGallery } = await import(
        "flickr-justified-gallery"
      );

      instance = fjGallery(galleryRef.current, {
        itemSelector: ".gallery__item",
        rowHeight: 180,
        gutter: 6
      });
    })();

    return () => instance?.destroy?.();
  }, [data]);

  return (
    <div ref={galleryRef}>
      <LightGallery plugins={[lgZoom]} elementClassNames="gallery">
        {data.map((img, i) => (
          <a key={i} className="gallery__item" data-src={img.download_url}>
            <img src={img.download_url} />
          </a>
        ))}
      </LightGallery>
    </div>
  );
};

export default ImageGallery;








// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import LightGallery from "lightgallery/react";
// import lgZoom from "lightgallery/plugins/zoom";
// import fjGallery from "flickr-justified-gallery";

// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";

// type GalleryItem = {
//   src: string;
//   thumb: string;
//   size: string;
//   subHtml: string;
// };

// const ImageGallery: React.FC = () => {
//   const [data, setData] = useState<GalleryItem[]>([]);
//   const galleryRef = useRef<HTMLDivElement>(null);

//   // 🔹 Fetch API
//   useEffect(() => {
//     fetch("https://picsum.photos/v2/list?page=1&limit=100")
//       .then(res => res.json())
//       .then(items =>
//         setData(
//           items.map((item: any) => ({
//             src: `https://picsum.photos/id/${item.id}/${item.width}/${item.height}`,
//             thumb: `https://picsum.photos/id/${item.id}/500/300`,
//             size: `${item.width}-${item.height}`,
//             subHtml: `<h4>Photo by - ${item.author}</h4>`
//           }))
//         )
//       )
//       .catch(console.error);
//   }, []);

//   // 🔹 Initialize fjGallery AFTER data renders
//   useEffect(() => {
//     if (!galleryRef.current || data.length === 0) return;

//     const container = galleryRef.current;

//     // 🔥 Destroy previous instance
//     // @ts-ignore
//     container.fjGallery && container.fjGallery.destroy?.();

//     // ⏳ wait till images load
//     const timer = setTimeout(() => {
//       fjGallery(container, {
//         itemSelector: ".gallery__item",
//         rowHeight: 180,
//         gutter: 6,
//         lastRow: "start",
//       });
//     }, 100);

//     return () => clearTimeout(timer);
//   }, [data]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <div ref={galleryRef}>
//         <LightGallery plugins={[lgZoom]} elementClassNames="gallery">
//           {data.map((img, idx) => (
//             <a
//               key={idx}
//               className="gallery__item"
//               data-src={img.src}
//               data-lg-size={img.size}
//               data-sub-html={img.subHtml}
//             >
//               <img
//                 src={img.thumb}
//                 className="w-full h-full object-cover cursor-pointer"
//                 alt={`Image ${idx}`}
//               />
//             </a>
//           ))}
//         </LightGallery>
//       </div>
//     </div>
//   );
// };

// export default ImageGallery;
