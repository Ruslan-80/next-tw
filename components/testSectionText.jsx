export default function Projects() {
  const projects = [
    { title: "Project One", img: "/p1.jpg" },
    { title: "Project Two", img: "/p2.jpg" },
  ];

  return (
    <section className="py-32 px-6">
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((p, i) => (
          <div
            key={i}
            className="group relative overflow-hidden cursor-pointer"
          >
            <img
              src={p.img}
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

            <h3 className="absolute bottom-6 left-6 text-xl">{p.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
