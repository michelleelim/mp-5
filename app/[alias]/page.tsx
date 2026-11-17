import getUrlByAlias from "@/lib/getUrlAlias";
import { redirect, notFound } from "next/navigation";

export default async function AliasPage({params, }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;
    const url = await getUrlByAlias(alias);

    if (!url) {
        notFound();
    }
    redirect(url);
}