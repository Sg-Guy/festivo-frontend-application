import { useQuery } from "@tanstack/react-query";
import { CosmicVortex } from "../../Components/spinners/spinner1";
import { CyberpunkDna } from "../../Components/spinners/spinner2";
import { NeonEclipse } from "../../Components/spinners/spinner3";

// Fonction de récupération (fetch classique)
const fetchPosts = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/posts");
  if (!res.ok) throw new Error("Erreur réseau");
  return res.json();
};
    
export default function ListePosts() {
  // useQuery gère automatiquement le chargement et les erreurs
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isError) return <div>Erreur</div>;
  if (isLoading) return <div className="d-flex align-center"> <CyberpunkDna /> </div>;

  return (
    <ul>
      {posts?.data?.map((post) => (
        <li key={post.id} className="">{post.title}</li>
      ))}
    </ul>
  );
}
