export default function AdminDashboard() {
    return (
        <>
            <div className="flex-1 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-gray-600 aspect-video rounded-xl" />
                    <div className="bg-gray-600 aspect-video rounded-xl" />
                    <div className="bg-gray-600 aspect-video rounded-xl" />
                </div>
                <div className="bg-gray-600 mt-4 min-h-[50vh] rounded-xl" />
            </div>
        </>
    );
}
