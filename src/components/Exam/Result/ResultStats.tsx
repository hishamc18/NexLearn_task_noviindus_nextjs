import Image from "next/image";

export default function ResultStats({ icon, bg, label, value }: { icon: string; bg: string; label: string; value: string | number }) {
    return (
        <div className="flex items-center">
            <div className={`${bg} p-2 rounded-md flex items-center justify-center`}>
                <Image src={icon} width={20} height={20} alt={label} />
            </div>
            <span className="flex-1 ml-4 text-[#1C3141] text-sm font-medium">{label}</span>
            <span className="font-bold text-[#1C3141]">{value}</span>
        </div>
    );
}