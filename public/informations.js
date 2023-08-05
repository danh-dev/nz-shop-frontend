import {ref} from "vue";
const informations = ref([
	{
		id: 1,
		name: "Xiaomi Redmi Note 12 Pro",
		type: "Xiaomi",
		price: "8.990.000đ",
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
			{ id: 4, name: "Đỏ", value: "Đỏ" },
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

		articles: [
			{
				id: 1,
				image: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/thoi-nghe-18-5.jpg",
				title: "Tìm hiểu giá iPhone trên Apple Store Online tại VN, HTC trở lại đường đua?",
			},
			{
				id: 2,
				image: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/06/Galaxy-A23-5G-7.jpeg",
				title: "Top smartphone tầm trung có màn hình lớn xem phim tốt nhất hiện nay.",
			},
			{
				id: 3,
				image:
					"https://cellphones.com.vn/sforum/wp-content/uploads/2023/04/Xiaomi-Redmi-Note-12-Pro-1-1.jpg",
				title:
					"Đánh giá chi tiết Xiaomi Redmi Note 12 Pro 5G: Xiaomi khác hay người dùng xưa và nay đã khác?",
			},
			{
				id: 4,
				image:
					"https://cdn.sforum.vn/sforum/wp-content/uploads/2023/03/Xiaomi-Redmi-Note-12-Pro-25-e1680257603900-1.jpg",
				title:
					"Trên tay Redmi Note 12 Pro 5G: Thiết kế cao cấp, camera chất lượng cao, giá 9.49 triệu đồng",
			},
		],

		anotherAccessories: [
			{
				id: 1,
				image:
					"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_i_xu_ng_23__4_4.png",
				name: "Tai nghe không dây Redmi Buds 4",
				rating: 5,
				price: "890.000đ",
				originPrice: "490.000đ",
			},
			{
				id: 2,
				image:
					"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/golf_candy_10.000mah_g80_1.png",
				name: "Pin sạc dự phòng Golf Candy 10.000mAh G80.",
				rating: 5,
				price: "175.000đ",
				originPrice: "350.000đ",
			},
			{
				id: 3,
				image:
					"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_135_1.png",
				name: "Củ sạc Baseus 25W, kèm cáp Type-C 1M",
				rating: 4,
				price: "300.000đ",
				originPrice: "490.000đ",
			},
			{
				id: 4,
				image:
					"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_9_1_.png",
				name: "Củ sạc Xiaomi 20W cổng USB-C",
				rating: 5,
				price: "220.000đ",
				originPrice: "300.000đ",
			},
			{
				id: 5,
				image:
					"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_2_1_2.png",
				name: "Dán cường lực Xiaomi Redmi Note 12",
				rating: 4,
				price: "150.000đ",
				originPrice: "170.000đ",
			},
			{
				id: 6,
				name: "Dán cường lực Xiaomi Redmi Note 12 LikGlass",
				image: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/g/r/group_249_5_.png",
				price: "120.000đ",
				originPrice: "150000đ"
			}
		],

		designs: [
			{ id: 1, name: "Note 12 Pro 5GB", link: "#", price: "8.990.000đ" },
			{ id: 2, name: "Note 12 Pro 4GB", link: "#", price: "7.590.000đ" },
			{ id: 3, name: "Note 12S", link: "#", price: "6.190.000đ" },
		],
	},
]);

export default informations;