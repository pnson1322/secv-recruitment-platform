# SECV - Software Engineering Career & CV Portal (Frontend)

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

Nền tảng kết nối tuyển dụng và quản lý hồ sơ nghề nghiệp (CV) chuyên biệt cho Sinh viên ngành Kỹ thuật Phần mềm và Doanh nghiệp tuyển dụng liên kết. Hệ thống hỗ trợ xây dựng hồ sơ trực tuyến, tìm kiếm & ứng tuyển việc làm, quản lý tin tuyển dụng, duyệt ứng viên và trò chuyện thời gian thực giữa các bên.

---

## 🚀 Tính năng chính

### 1. Phân hệ Sinh viên (Student Portal)

| Nhóm chức năng | Mô tả |
| :--- | :--- |
| **Dashboard** | Hiển thị banner chào mừng, gợi ý việc làm phù hợp (Recommendations) và danh sách tất cả công việc đang tuyển |
| **Hồ sơ cá nhân & CV** | Quản lý thông tin cá nhân, GPA, chuyên ngành, trạng thái "Open to Work"; tải lên nhiều file CV (PDF) và chọn CV mặc định để ứng tuyển nhanh |
| **Kỹ năng & Sở thích** | Khai báo danh sách kỹ năng (Skills) và lĩnh vực quan tâm |
| **Nguyện vọng việc làm** | Cấu hình địa điểm làm việc mong muốn, khoảng lương mong đợi (Job Preference) |
| **Tìm kiếm Công ty** | Duyệt danh sách doanh nghiệp đối tác với bộ lọc và thanh tìm kiếm |
| **Lưu & Theo dõi** | Lưu tin tuyển dụng quan tâm (Saved Jobs), theo dõi công ty yêu thích (Followed Companies) |
| **Quản lý Ứng tuyển** | Xem lịch sử ứng tuyển, thống kê trạng thái hồ sơ (đang chờ, đã duyệt, bị từ chối) với biểu đồ trực quan |
| **Nhắn tin (Chat)** | Trao đổi trực tiếp với Nhà tuyển dụng qua kênh chat thời gian thực (Socket.io) |
| **Thông báo** | Nhận thông báo đẩy thời gian thực khi có cập nhật từ nhà tuyển dụng |
| **Cài đặt tài khoản** | Đổi mật khẩu, quản lý thông tin đăng nhập |

### 2. Phân hệ Nhà tuyển dụng (Recruiter Portal)

| Nhóm chức năng | Mô tả |
| :--- | :--- |
| **Đăng ký Nhà tuyển dụng** | Form đăng ký doanh nghiệp nhiều bước với upload giấy phép kinh doanh, chờ Admin duyệt |
| **Dashboard** | Thống kê tổng quan (số tin đăng, lượt ứng tuyển), biểu đồ phân bố ngành nghề, tỷ lệ tuyển dụng thành công, danh sách tin gần đây |
| **Hồ sơ Doanh nghiệp** | Quản lý thông tin công ty (logo, ảnh bìa, mô tả, lĩnh vực hoạt động, quy mô, liên hệ, gallery văn phòng) với các modal chỉnh sửa từng phần |
| **Quản lý Tin tuyển dụng** | Tạo mới, chỉnh sửa, xem chi tiết và quản lý trạng thái bài đăng tuyển dụng (Job Postings) |
| **Quản lý Ứng viên** | Duyệt danh sách ứng viên theo từng tin tuyển dụng, xem CV, cập nhật trạng thái (Đạt/Không đạt/Hẹn phỏng vấn), gửi lại lời mời |
| **Tìm kiếm Ứng viên** | Chủ động tìm kiếm hồ sơ sinh viên trong hệ thống (Search Candidates) |
| **Nhắn tin (Chat)** | Liên hệ trực tiếp với ứng viên tiềm năng qua chat thời gian thực |
| **Đánh giá** | Xem đánh giá của sinh viên về doanh nghiệp (Company Reviews) |

### 3. Phân hệ Quản trị viên (Admin Portal)

| Nhóm chức năng | Mô tả |
| :--- | :--- |
| **Dashboard Tổng quan** | Biểu đồ thống kê toàn hệ thống: tổng sinh viên, xu hướng ứng tuyển, tỷ lệ tuyển dụng thành công, top công ty, phân bố ngành nghề |
| **Quản lý Sinh viên** | Danh sách, bộ lọc, thống kê nhanh và xem chi tiết hồ sơ từng sinh viên |
| **Quản lý Danh mục nghề** | CRUD danh mục ngành nghề/công việc (Job Categories) với bảng thống kê |
| **Kiểm duyệt Tin tuyển dụng** | Duyệt/từ chối các tin đăng tuyển dụng từ doanh nghiệp (Job Moderation) với bộ lọc và thống kê |
| **Giám sát Doanh nghiệp** | Xem danh sách công ty đã đăng ký, thay đổi trạng thái hoạt động (Monitoring) |
| **Cài đặt Hệ thống** | Cấu hình chung cho hệ thống (Admin Settings) |

---

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ | Phiên bản |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.1.6 |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS + PostCSS | v4 |
| **Language** | TypeScript | 5.x |
| **Server State** | @tanstack/react-query | 5.x |
| **Forms** | React Hook Form + Zod | 7.x / 4.x |
| **HTTP Client** | Axios (interceptors, token refresh) | 1.x |
| **Real-time** | Socket.io Client | 4.x |
| **Notifications** | Sonner (toast) | 2.x |
| **Icons** | Lucide React | 0.577 |
| **Build Tool** | React Compiler (babel plugin) | 1.0.0 |
| **Package Manager** | pnpm (workspace) | — |

---

## 📁 Cấu trúc Thư mục

```text
se-cv-fe/
├── public/                     # Tài nguyên tĩnh (favicon, SVG, illustrations)
├── src/
│   ├── app/                    # Next.js App Router — Định tuyến & Layouts
│   │   ├── login/              #   Đăng nhập (Email/Password, Google OAuth)
│   │   ├── register/           #   Đăng ký tài khoản sinh viên
│   │   ├── oauth/              #   Callback xử lý đăng nhập Google
│   │   ├── unauthorized/       #   Trang thông báo không có quyền truy cập
│   │   ├── jobs-detail/        #   Chi tiết tin tuyển dụng (public)
│   │   ├── company/[id]/       #   Trang hồ sơ công ty (public)
│   │   ├── student/            #   ── Phân hệ Sinh viên ──
│   │   │   ├── dashboard/      #     Trang chủ sinh viên
│   │   │   ├── profile/        #     Hồ sơ & quản lý CV
│   │   │   ├── applications/   #     Lịch sử ứng tuyển
│   │   │   ├── companies/      #     Danh sách công ty
│   │   │   ├── saved-jobs/     #     Việc đã lưu & Công ty theo dõi
│   │   │   ├── messages/       #     Nhắn tin với nhà tuyển dụng
│   │   │   └── settings/       #     Cài đặt tài khoản
│   │   ├── recruiter/          #   ── Phân hệ Nhà tuyển dụng ──
│   │   │   ├── dashboard/      #     Thống kê tuyển dụng
│   │   │   ├── company/        #     Quản lý hồ sơ doanh nghiệp
│   │   │   ├── profile/        #     Chỉnh sửa hồ sơ doanh nghiệp
│   │   │   ├── job-postings/   #     Quản lý tin tuyển dụng
│   │   │   ├── jobs-detail/    #     Chi tiết tin đăng
│   │   │   ├── candidates/     #     Quản lý ứng viên
│   │   │   ├── search-candidates/ #  Tìm kiếm ứng viên
│   │   │   ├── messages/       #     Nhắn tin với ứng viên
│   │   │   └── settings/       #     Cài đặt tài khoản
│   │   └── admin/              #   ── Phân hệ Quản trị viên ──
│   │       ├── dashboard/      #     Dashboard thống kê toàn hệ thống
│   │       ├── students/       #     Quản lý danh sách sinh viên
│   │       ├── categories/     #     Quản lý danh mục ngành nghề
│   │       ├── moderation/     #     Kiểm duyệt tin tuyển dụng
│   │       ├── monitoring/     #     Giám sát doanh nghiệp
│   │       └── settings/       #     Cài đặt hệ thống
│   │
│   ├── components/             # Components dùng chung toàn hệ thống
│   │   ├── ClientPortal.tsx    #   React Portal cho modal/dropdown
│   │   ├── CustomSelect.tsx    #   Dropdown select tùy chỉnh
│   │   ├── Pagination.tsx      #   Phân trang
│   │   ├── layout/             #   Layout chung (AppFooter)
│   │   └── Providers/          #   React Query Provider
│   │
│   ├── features/               # ── Feature Modules (FDD) ──
│   │   ├── auth/               #   Xác thực: Login, Register, OAuth, Forgot/Reset Password,
│   │   │   │                   #   Change Password, ProtectedRoute, AuthContext, Token Storage
│   │   │   ├── api/            #     API calls (login, register, refresh, forgot-password...)
│   │   │   ├── components/     #     LoginForm, GoogleAuthButton, ForgotPasswordFlow,
│   │   │   │                   #     ChangePasswordModal, OtpVerificationModal, ProtectedRoute...
│   │   │   ├── constants/      #     Auth-related constants
│   │   │   ├── context/        #     AuthContext (quản lý trạng thái đăng nhập toàn cục)
│   │   │   ├── hooks/          #     useLogin, useRegister, useAuth...
│   │   │   ├── lib/            #     auth-storage, resolve-post-login-route
│   │   │   ├── schema/         #     Zod validation schemas
│   │   │   └── types/          #     Auth TypeScript types
│   │   │
│   │   ├── students/           #   Hồ sơ sinh viên & Quản lý CV
│   │   │   ├── api/            #     Student API calls
│   │   │   ├── components/     #     StudentProfilePage, CVManagementSection,
│   │   │   │   ├── profile/    #     JobPreferenceSection, SkillsInterestsSection, JobStatusSection
│   │   │   │   ├── saved/      #     SavedJobsTab, FollowedCompaniesTab
│   │   │   │   └── admin/      #     StudentManagementPage, StudentTable, StudentFilters
│   │   │   ├── hooks/          #     useStudentProfile, useStudentResumes...
│   │   │   └── types/          #     StudentProfile, StudentResume, JobPreference...
│   │   │
│   │   ├── applications/       #   Ứng tuyển việc làm
│   │   │   ├── api/            #     Application API calls
│   │   │   ├── components/     #     StudentApplicationsPage, ApplicationStats,
│   │   │   │                   #     ApplicationList, ApplicationModals
│   │   │   ├── hooks/          #     useApplications, useApplyJob...
│   │   │   ├── types/          #     Application types
│   │   │   └── utils/          #     Helpers (format trạng thái, màu sắc status...)
│   │   │
│   │   ├── job-postings/       #   Tin tuyển dụng
│   │   │   ├── api/            #     Job Posting API calls
│   │   │   ├── components/     #
│   │   │   │   ├── student/    #     StudentJobCard (giao diện sinh viên)
│   │   │   │   ├── company/    #     CompanyJobPostingsPage, CreateJob, EditJob, JobDetail
│   │   │   │   └── moderation/ #     JobModerationPage, Filters, Stats (dành cho Admin)
│   │   │   ├── constants/      #     Job-related constants
│   │   │   ├── hooks/          #     useJobPostings, useCreateJob, useJobDetail...
│   │   │   ├── schemas/        #     Zod validation schemas cho form tạo/sửa job
│   │   │   ├── types/          #     JobPosting, JobFilter types
│   │   │   └── utils/          #     Job-related helpers
│   │   │
│   │   ├── candidates/         #   Quản lý ứng viên (phía Recruiter)
│   │   │   ├── api/            #     Candidate API calls
│   │   │   ├── components/     #     CandidatesPage, SearchCandidatesPage,
│   │   │   │                   #     CandidateTabBar, ResendInvitationModal
│   │   │   ├── hooks/          #     useCandidates, useSearchCandidates...
│   │   │   └── types/          #     Candidate types
│   │   │
│   │   ├── companies/          #   Danh sách công ty (phía Sinh viên duyệt)
│   │   │   ├── components/     #     StudentCompaniesPage, CompanyCard, CompanyToolbar
│   │   │   └── hooks/          #     useCompanies...
│   │   │
│   │   ├── company-profile/    #   Hồ sơ chi tiết doanh nghiệp
│   │   │   ├── api/            #     Company Profile API calls
│   │   │   ├── components/     #
│   │   │   │   ├── profile/    #     CompanyProfilePage, Header, InfoGrid, AboutSection,
│   │   │   │   │               #     JobsSection, ReviewsSection, OfficeGallery, MonitoringPage
│   │   │   │   └── edit-profile/ #   Các modal chỉnh sửa (Logo, Cover, BasicInfo, Contact,
│   │   │   │                   #     Description, Detail, OfficeImages)
│   │   │   ├── hooks/          #     useCompanyProfile, useEditCompany...
│   │   │   └── types/          #     CompanyProfile types
│   │   │
│   │   ├── chat/               #   Nhắn tin thời gian thực
│   │   │   ├── api/            #     Chat API calls
│   │   │   ├── components/     #     ChatContainer, ConversationList, MessageList,
│   │   │   │                   #     MessageInput, ChatHeader, EmptyChatState
│   │   │   ├── hooks/          #     useChat, useChatSocket...
│   │   │   └── types/          #     Message, Conversation types
│   │   │
│   │   ├── dashboard/          #   Bảng điều khiển thống kê
│   │   │   ├── api/            #     Dashboard API calls
│   │   │   ├── components/     #
│   │   │   │   ├── student/    #     WelcomeBanner, RecommendationsSection, AllJobsSection
│   │   │   │   ├── recruiter/  #     RecruiterStatsGrid, JobCategoryDistribution,
│   │   │   │   │               #     SuccessRateChart, RecentJobsSection
│   │   │   │   ├── admin/      #     AdminStatsGrid, ApplicationsTrendChart,
│   │   │   │   │               #     SuccessRateBarChart, TopCompaniesList
│   │   │   │   └── shared/     #     Shared dashboard components
│   │   │   ├── hooks/          #     useDashboardStats...
│   │   │   └── types/          #     Dashboard stat types
│   │   │
│   │   ├── job-categories/     #   Quản lý danh mục ngành nghề (Admin)
│   │   │   ├── api/            #     JobCategory API calls
│   │   │   ├── components/     #     JobCategoriesPage, Table, Stats, AddForm, EditForm, DeleteModal
│   │   │   ├── hooks/          #     useJobCategories...
│   │   │   └── types/          #     JobCategory types
│   │   │
│   │   ├── navigation/         #   Thanh điều hướng
│   │   │   ├── components/     #     AppHeader, HeaderNav, HeaderUserMenu, HeaderNotification
│   │   │   ├── config/         #     header-nav.config (cấu hình menu theo vai trò)
│   │   │   └── hooks/          #     useNavigation...
│   │   │
│   │   ├── notification/       #   Hệ thống thông báo đẩy
│   │   │   ├── api/            #     Notification API calls
│   │   │   ├── hooks/          #     useNotification, useNotificationSocket
│   │   │   └── types/          #     Notification types
│   │   │
│   │   ├── recruiter-register/ #   Đăng ký nhà tuyển dụng (form nhiều bước)
│   │   │   ├── api/            #     Recruiter Register API calls
│   │   │   ├── components/     #     RecruiterRegisterForm, UploadBox, SectionTitle
│   │   │   ├── hooks/          #     useRecruiterRegister...
│   │   │   ├── schema/         #     Zod validation schemas
│   │   │   └── types/          #     Recruiter Register types
│   │   │
│   │   └── settings/           #   Cài đặt tài khoản
│   │       ├── api/            #     Settings API calls
│   │       ├── components/     #     StudentSettingsPage, RecruiterSettingsPage,
│   │       │                   #     AdminSettingsPage, CommonSettingsSection
│   │       ├── hooks/          #     useSettings...
│   │       └── types/          #     Settings types
│   │
│   ├── hooks/                  # Custom Hooks dùng chung
│   │   └── useDebounce.ts      #   Debounce input (tìm kiếm, lọc)
│   │
│   ├── lib/                    # Cấu hình thư viện bên thứ ba
│   │   ├── axios.ts            #   Axios instance, request/response interceptors, silent token refresh
│   │   └── socket.ts           #   Socket.io client connection (auto-attach JWT)
│   │
│   ├── types/                  # TypeScript types toàn cục
│   │
│   └── utils/                  # Hàm tiện ích dùng chung
│       ├── api-error.ts        #   Xử lý lỗi API chuẩn hóa
│       └── downloadCV.ts       #   Tải file CV từ URL
│
├── .env                        # Biến môi trường (NEXT_PUBLIC_API_BASE_URL)
├── eslint.config.mjs           # ESLint config (next/core-web-vitals + typescript)
├── next.config.ts              # Next.js config (React Compiler, remote images)
├── postcss.config.mjs          # PostCSS config
├── tsconfig.json               # TypeScript config (path alias @/* → ./src/*)
├── pnpm-workspace.yaml         # pnpm workspace config
└── package.json                # Dependencies & Scripts
```

---

## ⚙️ Cơ chế kỹ thuật nổi bật

### 1. Silent Token Refresh (Tự động làm mới Access Token)

Cấu hình trong [`src/lib/axios.ts`](src/lib/axios.ts):

- Mọi request API đều tự động đính kèm `Authorization: Bearer <token>` qua Request Interceptor.
- Khi server trả về `401`/`403` (token hết hạn), Response Interceptor chặn lỗi và đưa các request thất bại vào hàng đợi (`failedQueue`).
- Gửi request ngầm tới `/auth/refresh` (kèm Refresh Token trong HttpOnly Cookie) để lấy Access Token mới.
- Nếu thành công → cập nhật token mới → tự động gửi lại toàn bộ request trong hàng đợi → người dùng không bị gián đoạn.
- Nếu thất bại → xóa bộ nhớ xác thực → điều hướng về trang đăng nhập.

### 2. Real-time Communication (Socket.io)

Cấu hình trong [`src/lib/socket.ts`](src/lib/socket.ts):

- Kết nối WebSocket tự động thiết lập khi đăng nhập, gửi kèm JWT trong `auth` handshake.
- Phục vụ 2 tính năng chính:
  - **Chat**: Nhắn tin hai chiều tức thì giữa Sinh viên ↔ Nhà tuyển dụng.
  - **Notification**: Đẩy thông báo thời gian thực (ứng viên mới, trạng thái hồ sơ thay đổi...).

### 3. Xác thực & Phân quyền

- **AuthContext** (`src/features/auth/context/`) quản lý trạng thái đăng nhập toàn cục, lưu thông tin user và vai trò.
- **ProtectedRoute** component bọc quanh các route yêu cầu đăng nhập, kiểm tra vai trò (Student/Recruiter/Admin) và điều hướng về `/unauthorized` nếu không đủ quyền.
- Hỗ trợ đăng nhập bằng Email/Password và **Google OAuth** (callback tại `/oauth`).
- Luồng quên mật khẩu đầy đủ: Forgot Password → OTP Verification → Reset Password.

### 4. React Compiler & Performance

- Kích hoạt **React Compiler** (`reactCompiler: true` trong `next.config.ts`) để tự động tối ưu hóa re-render.
- Sử dụng **@tanstack/react-query** cho server state management với cơ chế caching thông minh, tránh fetch trùng lặp.
- Path alias `@/*` → `./src/*` giúp import gọn gàng xuyên suốt dự án.

---

## 🏁 Hướng dẫn Chạy dự án

### Yêu cầu hệ thống

- **Node.js** ≥ 18.x
- **pnpm** (khuyên dùng) hoặc **npm**

### Các bước thực hiện

```bash
# 1. Clone mã nguồn
git clone <repository_url>
cd se-cv-fe

# 2. Cài đặt thư viện
pnpm install        # hoặc: npm install

# 3. Cấu hình biến môi trường
#    Tạo file .env ở thư mục gốc:
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3000" > .env
#    (Thay URL trên khớp với địa chỉ API Backend)

# 4. Chạy Development Server
pnpm dev            # hoặc: npm run dev
#    → Truy cập: http://localhost:4000
#    (Port 4000 được cấu hình sẵn để tránh trùng với Backend port 3000)

# 5. Build Production
pnpm build          # hoặc: npm run build
pnpm start          # hoặc: npm run start
```

### Scripts có sẵn

| Script | Lệnh | Mô tả |
| :--- | :--- | :--- |
| `dev` | `next dev -p 4000` | Chạy dev server trên port 4000 |
| `build` | `next build` | Build production bundle |
| `start` | `next start` | Chạy production server |
| `lint` | `eslint` | Kiểm tra lỗi code với ESLint |

---

## 🧑‍💻 Quy chuẩn viết Code

### Đặt tên

| Loại | Convention | Ví dụ |
| :--- | :--- | :--- |
| Components | PascalCase | `StudentProfilePage.tsx`, `ChatContainer.tsx` |
| Hooks | camelCase, prefix `use` | `useStudentProfile.ts`, `useDebounce.ts` |
| Types | PascalCase | `StudentProfile`, `JobPosting` |
| API files | kebab-case | `student.api.ts`, `notification.api.ts` |
| Utils | camelCase | `downloadCV.ts`, `api-error.ts` |

### Tổ chức mã nguồn (Feature-Driven)

- Mỗi tính năng được đóng gói hoàn chỉnh trong `src/features/<tên-feature>/` bao gồm: `api/`, `components/`, `hooks/`, `types/`, và tùy chọn `schemas/`, `constants/`, `utils/`.
- Thư mục `src/app/` chỉ chứa các file route (`page.tsx`, `layout.tsx`) với nội dung tối giản — toàn bộ logic nghiệp vụ và UI được import từ `features/`.
- Components và hooks dùng chung giữa nhiều features được đặt tại `src/components/` và `src/hooks/`.

### Git Flow

- `feature/<tên-chức-năng>` — Phát triển tính năng mới
- `bugfix/<tên-lỗi>` — Sửa lỗi
- `refactor/<tên-phần>` — Tái cấu trúc / tối ưu mã nguồn