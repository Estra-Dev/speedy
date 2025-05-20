import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
// const bbox = [3.11, 6.41, 3.59, 6.61];
const sessionToken = uuidv4();

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");

  try {
    const params = new URLSearchParams({
      access_token: process.env.MAPBOX_ACCESS_TOKEN || "",
      autocomplete: "true",
      // country: "NG",
      types: "address,place,locality,neighborhood",
      limit: "8",
    });

    const res = await fetch(
      `
      ${BASE_URL}/${searchText}.json?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }

    const searchResult = await res.json();
    return NextResponse.json(searchResult);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
