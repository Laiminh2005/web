using System.Text;

namespace baithuchanh2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.UTF8;
            Console.InputEncoding = Encoding.UTF8;
            List<string> danhSach = new List<string>();
            int choice;
            do
            {
                Console.WriteLine("\n===QUẢN LÝ SINH VIÊN ===");
                Console.WriteLine("1. Thêm sinh viên (chuẩn hóa tên)");
                Console.WriteLine("2. In danh sách sinh viên");
                Console.WriteLine("3. Tìm kiếm sinh viên");
                Console.WriteLine("4. Sửa tên sinh viên");
                Console.WriteLine("5. Thoát");
                Console.Write("Mời bạn chọn: ");

                if (!int.TryParse(Console.ReadLine(), out choice))
                {
                    Console.WriteLine("Vui lòng nhập số hợp lệ.");
                    continue;
                }
                switch (choice)
                {
                    //Thêm sinh viên
                    case 1:
                        Console.Write("Nhập tên sinh viên: ");
                        string ten = Console.ReadLine();

                        ten = ten.Trim().ToLower();
                        string[] words = ten.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                        for (int i = 0; i < words.Length; i++)
                        {
                            words[i] = words[i].Substring(0, 1).ToUpper() + words[i].Substring(1);
                        }
                        ten = string.Join(" ", words);

                        if (!danhSach.Contains(ten))
                        {
                            danhSach.Add(ten);
                            Console.WriteLine($"Đã thêm sinh viên: {ten}");
                        }
                        break;
                    //In sinh viên
                    case 2:
                        if (danhSach.Count == 0)
                        {
                            Console.WriteLine("Danh sách rỗng!");
                        }
                        else
                        {
                            Console.WriteLine("\nDanh sách sinh viên:");
                            danhSach.Sort();
                            foreach (string sv in danhSach)
                            {
                                Console.WriteLine("- " + sv);
                            }
                        }
                        break;
                    //Tìm kiếm sinh viên
                    case 3: // Tìm kiếm
                        if (danhSach.Count == 0)
                        {
                            Console.WriteLine("Danh sách rỗng, không thể tìm!");
                        }
                        else
                        {
                            Console.Write("Nhập từ khóa cần tìm: ");
                            string keyword = Console.ReadLine().Trim().ToLower();

                            bool timThay = false;
                            Console.WriteLine("\nKết quả tìm kiếm:");
                            foreach (string sv in danhSach)
                            {
                                string svLower = sv.ToLower();
                                if (svLower.Contains(keyword) ||
                                    svLower.StartsWith(keyword) ||
                                    svLower.EndsWith(keyword))
                                {
                                    Console.WriteLine("- " + sv);
                                    timThay = true;
                                }
                            }
                            if (!timThay)
                            {
                                Console.WriteLine("Không tìm thấy sinh viên nào.");
                            }
                        }
                        break;
                    // Sửa tên sinh viên
                    case 4:
                        Console.Write("Nhập tên cũ: ");
                        string oldName = Console.ReadLine();

                        bool daSua = false;
                        for (int i = 0; i < danhSach.Count; i++)
                        {
                            if (danhSach[i].ToLower() == oldName.ToLower())
                            {
                                Console.Write("Nhập chuỗi cần thay thế: ");
                                string o = Console.ReadLine();
                                Console.Write("Nhập chuỗi mới: ");
                                string n = Console.ReadLine();
                                string newName = danhSach[i].Replace(o, n);
                                danhSach[i] = newName;
                                Console.WriteLine($"Đã sửa thành: {newName}");
                                daSua = true;
                                break;
                            }
                        }
                        if (!daSua) Console.WriteLine("Không tìm thấy sinh viên cần sửa.");
                        break;
                    case 5:
                        Console.WriteLine("Kết thúc chương trình.");
                        break;
                    default:
                        Console.WriteLine("Lựa chọn không hợp lệ.");
                        break;
                }
            } while (choice != 5);
        }
    }
}
