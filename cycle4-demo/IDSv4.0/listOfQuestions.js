export const surveyQuestions = [
    {
        id: "introduction",
        picture: "ids_logo.png",
        text: "Selamat datang ke kaji selidik bagi 'Pemantauan Dinamika Pembangunan Kerajaan Fasa 4 Bagi Tahun 2025'.",
        options: [{name:"Mula Survey"}]
    },
    {
        id: "zone",
        text: "Sila pilih 'Zon' anda",
        options: [
            { name: "Kudat", parlimenCodes: ["P167", "P168"] },
            { name: "Pantai Barat", parlimenCodes: ["P169", "P170", "P171", "P172", "P173", "P174", "P175", "P179"] },
            { name: "Pendalaman", parlimenCodes: ["P176", "P177", "P178", "P180", "P181", "P182"] },
            { name: "Sandakan", parlimenCodes: ["P183", "P184", "P185", "P186", "P187"] },
            { name: "Tawau", parlimenCodes: ["P188", "P189", "P190", "P191"] }
 
        ]
    },
    
    {
        id: "parlimen",
        text: "Sila pilih 'Parlimen' anda",
        options: [
            {code: "P167", name: "Kudat", dun: ["N1 Banggi", "N2 Bengkoka", "N3 Pitas", "N4 Tanjong Kapor"]},
            {code: "P168", name: "Kota Marudu", dun: ["N5 Matunggong", "N6 Bandau", "N7 Tandek"]},
            {code: "P169", name: "Kota Belud",  dun: ["N8 Pintasan", "N9 Tempasuk", "N10 Usukan", "N11 Kedamaian"]},
            {code: "P170", name: "Tuaran",  dun: ["N12 Sulaman", "N13 Pantai Dalit", "N14 Tamapruli", "N15 Kiulu"]},
            {code: "P171", name: "Sepanggar", dun: ["N16 Karambunai", "N17 Darau", "N18 Inanam"]},
            {code: "P172", name: "Kota Kinabalu",  dun: ["N19 Likas", "N20 Api-Api", "N21 Luyang"]},
            {code: "P173", name: "Putatan",  dun: ["N22 Tanjong Aru", "N23 Petagas", "N24 Tanjung Keramat"]},
            {code: "P174", name: "Penampang",  dun: ["N25 Kapayan", "N26 Moyog"]},
            {code: "P175", name: "Papar", dun: ["N27 Limbahau", "N28 Kawang", "N29 Pantai Manis"]},
            {code: "P176", name: "Kimanis",  dun: ["N30 Bongawan", "N31 Membakut"]},
            {code: "P177", name: "Beaufort",  dun: ["N32 Kilas", "N33 Kuala Penyu"]},
            {code: "P178", name: "Sipitang",  dun: ["N34 Lumadan", "N35 Sindumin"]},
            {code: "P179", name: "Ranau", dun: ["N36 Kundasang", "N37 Karanaan", "N38 Panginatan"]},
            {code: "P180", name: "Keningau", dun: ["N39 Tambunan", "N40 Bingkor", "N41 Liawan"]},
            {code: "P181", name: "Tenom",  dun: ["N42 Melalap", "N43 Kemabong"]},
            {code: "P182", name: "Pensiangan", dun: ["N44 Tulid", "N45 Sook", "N46 Nabawan"]},
            {code: "P183", name: "Beluran",  dun: ["N47 Telupid", "N48 Sugut", "N49 Labuk"]},
            {code: "P184", name: "Libaran",  dun: ["N50 Gum-Gum", "N51 Sungai Manila", "N52 Sungai Sibuga"]},  
            {code: "P185", name: "Batu Sapi",  dun: ["N53 Sekong", "N54 Karamunting"]},
            {code: "P186", name: "Sandakan",  dun: ["N55 Elopura", "N56 Tanjong Papat"]},
            {code: "P187", name: "Kinbatangan", dun: ["N57 Kuamut", "N58 Lamag", "N59 Sukau"]},
            {code: "P188", name: "Lahad Datu",  dun: ["N60 Tungku", "N61 Segama", "N62 Silam", "N63 Kunak"]},
            {code: "P189", name: "Semporna",  dun: ["N64 Sulabayan", "N65 Senallang", "N66 Bugaya"]}, 
            {code: "P190", name: "Tawau",  dun: ["N67 Balung", "N68 Apas", "N69 Sri Tanjong"]},
            {code: "P191", name: "Kelabakan", dun: ["N70 Kukusan", "N71 Tanjung Batu", "N72 Merotai", "N73 Sebatik"]}
        ]
    },
    {
        id: "jantina",
        text: "Sila pilih jantina anda",
        options: [
            {name: "Lelaki"},
            {name: "Perempuan"}
        ]
    },
    {
        id: "umur",
        text: "Bagaimana pula umur anda:",
        options: [
            {name: "18-25"},
            {name: "26-35"},
            {name: "36-45"},
            {name: "46-55"},
            {name: "55-65"},
            {name: "66-75"},
            {name: "75 & Keatas"},
        ]
    },
    {
        id: "bangsa",
        text: "Sila pilih bangsa anda:",
        options: [
            {name: "KDMR (MOMOGUN)"},
            {name: "Bajau (Suluk)"},
            {name: "Cina"},
            {name: "Melayu"},
            {name: "India"},
            {name: "Lain - Lain"}
        ]
    },
    {
        id: "mengundiAdun",
        text: "",
        options: [
            {name: "Ya"},
            {name: "Tidak"},
            {name: "Lain - Lain"}
        ]
    },
    {
        id: "cenderungUntukUndi",
        text: "Parti manakah anda lebih cenderung untuk undi?",
        options: [
            {name: "BN"},
            {name: "PH"},
            {name: "GRS"},
            {name: "WARISAN"},
            {name: "Tidak Pasti"},
            {name: "Lain - Lain"}
        ]
    },
    {
        id: "pemimpinSabah",
        text: "Akhir sekali, pada pendapat anda siapa yang layak untuk memimpin sabah?",
        options: [
            {name: "Hajiji Noor (GRS)"},
            {name: "Shafie Apdal (WARISAN)"},
            {name: "Bung Moktar(BN)"},
            {name: "Ewon Benedick(PH)"},
            {name: "Tidak Pasti"},
            {name: "Lain - Lain"}
        ]
    },
    {
        id: "isiBorangLagi",
        text: "Adakah anda ingin mengisi borang lagi sekali?",
        options: [
            {name: "Iya, (isi kaji selidik yang baru)"},
            {name: "Tidak, (Sesi ditamatkan)"},

        ]
    },
]