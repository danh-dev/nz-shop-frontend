import {ref} from "vue";
const product = ref(
	{
		id: "4",
    name: "Xiaomi Redmi Note 12 Pro",
    priceRegular: 8990000,
    variations: [],
    thumbnail: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12s_4__1_2.jpg",
    url: "#",
		rating: 4,
		value: 224,
		review: "3,360 đánh giá",

		details: [
			{
				id: 1,
				name: "Xiaomi Redmi Note 12 Pro",
				status: "Mới, đầy đủ phụ kiện từ nhà sản xuất.",
				guarantee:
					"Bảo hành 18 tháng tại trung tâm bảo hành chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.",
				invoice: "Giá sản phẩm đã bao gồm VAT.",
				description:
					" sở hữu cấu hình vượt trội gồm chip MediaTek Dimensity 1080, hệ thống ba camera với cảm biến chính 50MP và mạng 5G. Ngoài ra, màn hình Note 12 Pro 5G có kích thước khá lớn khoảng 6.67 inch, tấm nền AMOLED, tần số quét 120Hz khiến chiếc điện thoại nổi bật trong tầm giá dưới 8 triệu.",
			},
		],

		accessories: [
			{ id: 1, name: "Xiaomi Redmi Note 12 Pro" },
			{ id: 2, name: "Sạc 67W" },
			{ id: 3, name: " Vỏ bảo vệ" },
			{ id: 4, name: "Cáp USB Type-C" },
			{ id: 5, name: "Công cụ tháo SIM" },
			{ id: 6, name: "Thẻ bảo hành, Hướng dẫn bắt đầu nhanh" },
		],

		specials: [
			{
				id: 1,
				name: "Thiết kế hiện đại, trẻ trung với mặt lưng kính thời thượng và khung viền kim loại vuông vức sang trọng.",
			},
			{
				id: 2,
				name: "Tấm nền AMOLED cho khả năng hiển thị rõ nét, tần số quét 120Hz giúp mọi thao tác trở nên mượt mà.",
			},
			{
				id: 3,
				name: "Bắt trọn mọi khoảnh khắc với cảm biến chính, độ phân giải cao, hỗ trợ chống rung.",
			},
		],

		colors: [
			{ id: 1, name: "Trắng", value: "Trắng" },
			{ id: 2, name: "Đen", value: "Đen" },
			{ id: 3, name: "Xanh dương", value: "Xanh dương" },
		],

		discounts: [
			{
				id: 1,
				name: "Nhận khuyến mãi giảm giá hoặc sim 4G Mobifone MAX90 6GB/ngày. Liên hệ 1800.2097 để được tư vấn và nhận báo giá tốt nhất.",
			},
			{
				id: 2,
				name: "Hotsale từ ngày 20/07 - 30/07 giảm giá 10% (số lượng có hạn, áp dụng cùng các chương trình thanh toán khác).",
			},
		],

		promotions: [
			{ id: 1, name: " Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)." },
			{
				id: 2,
				name: " Từ 8/7 - 31/7: Tặng mã giảm giá 3% (tối đa 100.000đ) cho đơn hàng gia dụng tiếp theo.",
			},
			{ id: 3, name: " Giảm đến 100k khi thanh toán qua Shopee Pay." },
			{ id: 4, name: " Giảm 500k đơn hàng từ 10 triệu (trừ các sản phẩm Apple)." },
		],

		specifications: [
			{ id: 1, title: "Kích thước màn hình", name: "6.67 inches" },
			{ id: 2, title: "Độ phân giải màn hình", name: "1080 x 2400 pixels (FullHD+)" },
			{ id: 3, title: "Hệ điều hành", name: "Android 12" },
			{ id: 4, title: "Công nghệ màn hình", name: "AMOLED" },
			{
				id: 5,
				title: "Camera sau",
				name: "Camera góc rộng: 50MP, f/1.9, PDAF, OIS Camera góc siêu rộng: 8 MP, f/1.9, 119˚ Camera macro: 2 MP, f/2.4",
			},
			{ id: 6, title: "Camera trước", name: "Camera góc rộng: 16 MP" },
			{ id: 7, title: "Dung lượng RAM", name: "8 GB" },
			{ id: 8, title: "Thẻ SIM", name: "2 SIM (Nano-SIM)" },
			{ id: 9, title: "Pin", name: "5.000 mAh" },
		],

		faqs: [
			{
				id: 1,
				question: "Ưu đãi đặt trước Redmi Note 12 Pro 5G có gì hấp dẫn?",
				answer: [
					{
						id: 1,
						answer: "Xiaomi Redmi Note 12 Pro 5G được đặt trước tại NZ Shop có giá chính thức 9.490.000đ đi kèm nhiều ưu đãi hấp dẫn, bao gồm: Tặng Tai nghe không dây Xiaomi Buds 3 trị giá 2.690.000đ HOẶC Giảm thẳng 500.000đ.\n Chương trình trả góp 0% - chỉ cần trả trước từ 1.000.000đ.",
					},
				],
			},
			{
				id: 2,
				question: "Màn hình Redmi Note 12 Pro 5G chất lượng có tốt không?",
				answer: [
					{
						id: 1,
						answer: "Bạn hoàn toàn có thể tin tưởng vào chất lượng màn hình của chiếc điện thoại này khi mà Xiaomi đã trang bị trên màn hình 6.67 inch, tấm nền AMOLED đi cùng độ phân giải Full HD+ và tần số quét 120 Hz nhờ đó có thể hiển thị hình ảnh sắc nét và sống động.",
					}
				],
			},
			{
				id: 3,
				question: "Camera Redmi Note 12 Pro có gì nổi bật?",
				answer: [
					{
						id: 1,
						answer: "Redmi Note 12 Pro sở hữu cụm 3 camera sau chất lượng với camera chính 50MP và được hỗ trợ chống rung quang học IOS đem lại những khung hình sắc nét và chuyên nghiệp.",
					}
				],
			},
			{
				id: 4,
				question: "Redmi Note 12 Pro chơi game có tốt không?",
				answer: [
					{ id: 1,
						answer: "Redmi Note 12 Pro sở hữu các yếu tố phù hợp để chơi game như: Chip xử lí MediaTek 1080 (6nm) đa dụng, RAM 6GB, màn hình 120hz cuộn lướt mượt mà và pin trâu 5000mAh.",
					}
				],
			},
		],

		comments: [
			{
				id: 1,
				avatar: "T",
				name: "Trinh",
				time: "27/5/2023 09:09",
				rating: 5,
				comment: "Điện thoại rất tốt.",
			},
			{
				id: 2,
				avatar: "J",
				name: "Jonathan",
				time: "20/5/2023 10:50",
				rating: 4,
				comment: "sản phẩm dùng ổn.",
			},
			{
				id: 3,
				avatar: "S",
				name: "Sơn Hải",
				time: "28/5/2023 14:08",
				rating: 4,
				comment: "Sản phẩm rất tốt.",
			},
			{
				id: 4,
				avatar: "N",
				name: "Vũ Xuân Nam",
				time: "20/4/2023 17:50",
				rating: 5,
				comment: "sản phẩm tốt nhân viên nhiệt tình",
			},
			{
				id: 5,
				avatar: "T",
				name: "Trần Thanh Tiền",
				time: "14/4/2023 18:01",
				rating: 5,
				comment: "Máy mượt mà đẹp pin Sài được 1 ngày trọn vẹn, nhân viên hỗ trợ nhiệt tình.",
			},
		],

		questions: [{ id: 1, name: "", question: "", rating: "" }],

		designs: [
			{ id: 1, name: "Note 12 Pro 5GB", url: "#", priceRegular: 8990000 },
			{ id: 2, name: "Note 12 Pro 4GB", url: "#", priceRegular: 7590000 },
			{ id: 3, name: "Note 12S", url: "#", priceRegular: 6190000 },
		],
	},
);

export default product;