import URLForm from "@/components/UrlForm";

export default function Home() {
  return (
      <div className="page">
        <h1>CS303 URL Shortener</h1>
        <p className="sub">
            Create shorter links to share easily!
        </p>
        <URLForm />
      </div>
  );
}