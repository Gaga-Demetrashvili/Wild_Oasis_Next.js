import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// This was useful for pages router, but now we have Server Actions.
// Also this is nice way to expose API endpoints for some client which needs our data.
// We can expose our Superbase data, or aggregate some of it and return that way to our client without exposing our superbase keys. 
export async function GET(request, { params }) {
    const { cabinId } = params;

    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId),
            getBookedDatesByCabinId(cabinId)
        ]);
        return Response.json({ cabin, bookedDates });
    } catch (error) {
        console.log(error.message);
        return Response.json({ message: "Cabin not found" });
    }
}

// export async function POST() {}