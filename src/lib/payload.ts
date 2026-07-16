import { BlogPost, JobOpening } from '../types';

// Retrieve the Payload CMS URL from Vite environment variables.
// Users can configure this in their local environment or AI Studio settings.
export const PAYLOAD_CMS_URL = (import.meta as any).env?.VITE_PAYLOAD_CMS_URL || '';

export interface PayloadStatus {
  isConnected: boolean;
  url: string;
  source: 'Payload CMS' | 'Local Demo Mode';
  error?: string;
}

// Initial high-quality blog posts that act as a fallback and seed data
export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Hóa học của sắc độ và chiều sâu không gian: Giải mã công nghệ Chroma-Lock™ từ GAMA Lab',
    excerpt: 'Tìm hiểu sâu về cấu trúc liên kết phân tử và công nghệ chất tạo màu giúp lớp phủ kiến trúc của GAMA chống chọi với khí hậu nhiệt đới khắc nghiệt, bảo tồn vẻ đẹp nguyên bản qua nhiều thập kỷ.',
    category: 'Science',
    date: '11 tháng 7, 2026',
    readTime: '5 phút đọc',
    author: { name: 'Tiến sĩ Tariq Al-Mansoor', role: 'Giám đốc Nghiên cứu & Phát triển (R&D)' },
    content: `Tại các khu vực có bức xạ mặt trời cường độ cao và khí hậu nóng ẩm mưa nhiều như Việt Nam, sự xuống cấp của màng sơn là một thử thách lớn đối với mọi kiến trúc sư. Các dòng sơn thông thường dễ bị phấn hóa, nứt nẻ và phai màu chỉ sau một vài mùa mưa nắng. 

Tại GAMA Lab, chúng tôi tiếp cận màng sơn như một tác phẩm kỹ nghệ hóa học tinh xảo. Công nghệ Chroma-Lock™ được phát triển dựa trên mạng lưới liên kết acrylic-copolymer siêu dày đặc ôm trọn các phân tử titan dioxide tinh khiết. Cấu trúc này hoạt động như một bộ lọc quang học chủ động, phản xạ tia cực tím và hấp thụ năng lượng dư thừa trước khi nó có thể phá hủy các liên kết sắc tố màu hữu cơ.

Ngoài ra, công thức sơn gốc nước tiên tiến của GAMA cho phép màng sơn có khả năng "thở" tự nhiên — thoát hơi ẩm từ sâu bên trong bê tông nhưng hoàn toàn ngăn chặn nước mưa thẩm thấu từ bên ngoài. Điều này giải quyết triệt để hiện tượng phồng rộp, bong tróc màng sơn, giữ cho không gian kiến trúc luôn mang vẻ tĩnh lặng, uy nghiêm và trường tồn cùng dòng chảy của thời gian.`
  },
  {
    id: 'post-2',
    title: 'Màu của Năm 2026: Sắc xanh Rhythm of Blues (Nhịp Điệu Xanh) kiến tạo không gian sống chánh niệm',
    excerpt: 'Dự báo xu hướng thiết kế nội thất với sự lên ngôi của các tông xanh êm dịu, mở ra kỷ nguyên của sự chữa lành, phục hồi năng lượng và kết nối sâu sắc với thiên nhiên nhiên.',
    category: 'Color',
    date: '29 tháng 6, 2026',
    readTime: '6 phút đọc',
    author: { name: 'Layla Ghabour', role: 'Trưởng bộ phận Thiết kế Mỹ thuật' },
    content: `Không gian sống không chỉ được định nghĩa bằng các bức tường vật lý, mà bằng cảm xúc mà nó khơi gợi cho tâm hồn. Trong nhịp sống hiện đại hối hả, ngôi nhà ngày càng đóng vai trò quan trọng như một nơi ẩn náu bình yên, một "thánh đường" tĩnh lặng để chữa lành và tái tạo năng lượng.

Xu hướng sắc màu 2026 đánh dấu sự dịch chuyển mạnh mẽ từ những tông xám tối giản lạnh lùng sang các sắc độ xanh tự nhiên, ấm áp và có chiều sâu cảm xúc. Tiêu biểu là "Rhythm of Blues" — sắc xanh mang nhịp điệu của bầu trời hừng đông và đại dương tĩnh lặng.

Để tái hiện hoàn hảo cảm xúc này trên bề mặt tường, các nhà hóa học GAMA đã tích hợp các tinh thể thạch anh siêu mịn vào công thức sơn bóng mờ nhung (Matt Finish). Khi ánh sáng ban ngày chuyển dịch, màng sơn tạo ra hiệu ứng tán xạ ánh sáng dịu nhẹ, loại bỏ hiện tượng chói mắt, biến mỗi căn phòng thành một tác phẩm nghệ thuật ánh sáng êm dịu, giúp tinh thần trở nên thư thái, tập trung và ngập tràn năng lượng tích cực.`
  },
  {
    id: 'post-3',
    title: 'Sự kiên định trước đại dương: Giải pháp màng bảo vệ chống ăn mòn từ GAMA Industrial Coatings',
    excerpt: 'Cẩm nang kỹ thuật toàn diện về chỉ định hệ sơn phủ epoxy polyamine giàu kẽm cho các công trình nghỉ dưỡng ven biển và hạ tầng ngoài khơi có độ mặn cực cao.',
    category: 'Industry',
    date: '20 tháng 5, 2026',
    readTime: '4 phút đọc',
    author: { name: 'Kỹ sư Marcus Vance', role: 'Chuyên gia Chất phủ Công nghiệp' },
    content: `Các công trình nghỉ dưỡng sát biển và hạ tầng hải cảng luôn là những thách thức khắc nghiệt nhất đối với độ bền vật liệu. Hơi muối mặn, sương mù axit và độ ẩm bão hòa liên tục tấn công, đẩy nhanh tốc độ ăn mòn điện hóa của kết cấu bê tông cốt thép lên gấp nhiều lần so với nội địa.

Nhằm bảo vệ vững chắc các di sản kiến trúc ven biển, bộ phận GAMA Industrial Coatings giới thiệu giải pháp sơn lót epoxy polyamine giàu kẽm hiệu năng cao. Lớp phủ này hoạt động theo cơ chế bảo vệ cathode chủ động — kẽm sẽ hy sinh để ngăn chặn quá trình oxy hóa lõi thép từ bên trong bê tông.

Lớp sơn lót này khi kết hợp với sơn phủ Acrylic-Polyurethane siêu bền của GAMA sẽ tạo ra một lớp lá chắn chống chịu cơ học xuất sắc, trơ lỳ trước tia cực tím cường độ cao và hóa chất ăn mòn. Việc ứng dụng hệ thống bảo vệ đa lớp của GAMA giúp các nhà đầu tư kéo dài chu kỳ bảo dưỡng công trình lên đến hơn 15 năm, tối ưu hóa hiệu quả tài chính và bảo tồn giá trị nghệ thuật nguyên vẹn.`
  },
  {
    id: 'post-4',
    title: 'Báo cáo Phát triển Bền vững GAMA: Cam kết màng sơn Eco-Shield không mùi và trung hòa Carbon',
    excerpt: 'Tầm nhìn chiến lược của GAMA trong việc tuân thủ các chuẩn mực xanh khắt khe, đạt chứng nhận LEED v4 và kiến tạo tương lai sinh thái bền vững cho thế hệ mai sau.',
    category: 'Business',
    date: '09 tháng 4, 2026',
    readTime: '3 phút đọc',
    author: { name: 'Yousef Ghafoor', role: 'Giám đốc Tiêu chuẩn & Tuân thủ' },
    content: `Kiến trúc bền vững không còn là một xu hướng nhất thời, mà đã trở thành trách nhiệm bắt buộc của mọi nhà phát triển dự án cao cấp. Việc lựa chọn vật liệu xây dựng ngày nay đòi hỏi sự minh bạch tuyệt đối về nguồn gốc sinh thái và tác động sức khỏe đối với cộng đồng.

Dòng sản phẩm GAMA Eco-Shield tự hào là lời cam kết mạnh mẽ nhất của chúng tôi đối với môi trường. Được nghiên cứu với công thức Zero-VOC (hoàn toàn không chứa các hợp chất hữu cơ dễ bay hơi độc hại), Eco-Shield loại bỏ hoàn toàn mùi sơn khó chịu ngay sau khi thi công, đảm bảo không gian sống trong lành và tuyệt đối an toàn cho cả trẻ nhỏ lẫn người có hệ hô hấp nhạy cảm.

Bên cạnh đó, quy trình sản xuất khép kín tại các nhà máy GAMA đã được tối ưu hóa năng lượng, hướng tới mục tiêu trung hòa carbon vào năm 2030. Lựa chọn GAMA không chỉ là lựa chọn một màng sơn chất lượng đỉnh cao, mà là cùng chúng tôi chung tay vun đắp một tương lai xanh, an lành và bền vững cho thế hệ mai sau.`
  }
];

/**
 * Utility to parse/transform Payload CMS API payload into the standard app BlogPost schema.
 * Payload CMS stores document lists in `docs`, where fields can vary slightly depending on custom schemas.
 */
function transformPayloadDoc(doc: any): BlogPost {
  // Extract content. Payload rich text can be a complex JSON array of nodes.
  // We'll extract raw text if it is formatted, or default to standard string content.
  let contentText = '';
  if (typeof doc.content === 'string') {
    contentText = doc.content;
  } else if (doc.content && Array.isArray(doc.content)) {
    // Basic rich text to plain text converter for Payload standard Lexical/Slate formats
    contentText = doc.content
      .map((block: any) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  } else if (doc.content_html) {
    contentText = doc.content_html; // backup html version
  } else {
    contentText = JSON.stringify(doc.content || '');
  }

  return {
    id: doc.id || String(doc._id || Math.random()),
    title: doc.title || 'Untitled Post',
    excerpt: doc.excerpt || doc.meta?.description || 'No excerpt available.',
    content: contentText || 'No content provided.',
    category: (doc.category || 'Science') as BlogPost['category'],
    date: doc.date || (doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : new Date().toLocaleDateString('en-US')),
    readTime: doc.readTime || `${Math.max(3, Math.ceil((contentText.split(/\s+/).length || 100) / 200))} min read`,
    author: {
      name: doc.author?.name || doc.author?.username || 'GAMA Contributor',
      role: doc.author?.role || 'Technical Specialist'
    }
  };
}

/**
 * Validates connectivity to the configured Payload CMS API.
 */
export async function checkPayloadConnection(): Promise<PayloadStatus> {
  if (!PAYLOAD_CMS_URL) {
    return {
      isConnected: false,
      url: '',
      source: 'Local Demo Mode'
    };
  }

  // Clean trailing slash
  const baseUrl = PAYLOAD_CMS_URL.replace(/\/$/, '');

  try {
    // Try to ping Payload access endpoint
    const response = await fetch(`${baseUrl}/api/posts?limit=1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000) // 4 seconds timeout
    });

    if (response.ok) {
      return {
        isConnected: true,
        url: baseUrl,
        source: 'Payload CMS'
      };
    } else {
      return {
        isConnected: false,
        url: baseUrl,
        source: 'Local Demo Mode',
        error: `API returned status ${response.status}: ${response.statusText}`
      };
    }
  } catch (err: any) {
    return {
      isConnected: false,
      url: baseUrl,
      source: 'Local Demo Mode',
      error: err.message || 'Unreachable or CORS policy blockage'
    };
  }
}

/**
 * Fetches all blog posts, either from Payload CMS or falling back to local storage/mock data.
 */
export async function fetchBlogPosts(): Promise<{ posts: BlogPost[]; source: 'Payload CMS' | 'Local Demo Mode'; error?: string }> {
  // If no Payload URL is defined, fall back immediately to local storage or defaults
  if (!PAYLOAD_CMS_URL) {
    const saved = localStorage.getItem('gama_local_posts');
    if (saved) {
      try {
        return { posts: JSON.parse(saved), source: 'Local Demo Mode' };
      } catch {
        // ignore corruption
      }
    }
    return { posts: INITIAL_BLOG_POSTS, source: 'Local Demo Mode' };
  }

  const baseUrl = PAYLOAD_CMS_URL.replace(/\/$/, '');
  try {
    const response = await fetch(`${baseUrl}/api/posts?limit=100&depth=1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data.docs)) {
      const mappedPosts = data.docs.map(transformPayloadDoc);
      return { posts: mappedPosts, source: 'Payload CMS' };
    } else {
      throw new Error('Response format is missing standard "docs" array');
    }
  } catch (err: any) {
    console.warn('Payload CMS fetch failed, falling back to local posts:', err);
    const saved = localStorage.getItem('gama_local_posts');
    let localPosts = INITIAL_BLOG_POSTS;
    if (saved) {
      try {
        localPosts = JSON.parse(saved);
      } catch {}
    }
    return { 
      posts: localPosts, 
      source: 'Local Demo Mode', 
      error: `Failed to fetch from Payload CMS (${err.message || err}). Displaying local backups.` 
    };
  }
}

/**
 * Creates a new blog post. If connected to Payload CMS, sends a POST request.
 * Otherwise, persists it locally in browser localStorage so it's durable during preview!
 */
export async function createBlogPost(postData: Omit<BlogPost, 'id' | 'date'>): Promise<{ post: BlogPost; source: 'Payload CMS' | 'Local Demo Mode' }> {
  const newPost: BlogPost = {
    ...postData,
    id: `post-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  if (PAYLOAD_CMS_URL) {
    const baseUrl = PAYLOAD_CMS_URL.replace(/\/$/, '');
    try {
      const response = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          category: postData.category,
          readTime: postData.readTime,
          author: postData.author
        })
      });

      if (response.ok) {
        const data = await response.json();
        return { post: transformPayloadDoc(data.doc || data), source: 'Payload CMS' };
      } else {
        console.warn(`Payload CMS POST failed with status ${response.status}, saving locally`);
      }
    } catch (err) {
      console.warn('Payload CMS POST request failed, falling back to localStorage persistence:', err);
    }
  }

  // Fallback to local storage persistence
  const saved = localStorage.getItem('gama_local_posts');
  let postsList = [...INITIAL_BLOG_POSTS];
  if (saved) {
    try {
      postsList = JSON.parse(saved);
    } catch {}
  }
  
  postsList = [newPost, ...postsList];
  localStorage.setItem('gama_local_posts', JSON.stringify(postsList));

  return { post: newPost, source: 'Local Demo Mode' };
}

/**
 * Resets local storage posts back to standard default seed data
 */
export function resetLocalPosts(): BlogPost[] {
  localStorage.removeItem('gama_local_posts');
  return INITIAL_BLOG_POSTS;
}

// ==========================================
// Careers Integration
// ==========================================

export const INITIAL_JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Nhà hóa học cao cấp về Công thức Polymer',
    department: 'Nghiên cứu & Phát triển (R&D)',
    location: 'Phòng thí nghiệm GAMA (Nhà máy Bình Dương)',
    type: 'Toàn thời gian',
    description: 'Chúng tôi đang tìm kiếm một nhà hóa học polymer giàu kinh nghiệm để dẫn dắt thế hệ tiếp theo của công thức sơn phủ GAMA Chroma-Lock™ và Eco-Shield. Bạn sẽ quản lý quá trình tổng hợp khoa học, thử nghiệm độ bền thời tiết trong buồng mô phỏng và đánh giá mức độ tuân thủ tiêu chuẩn môi trường.',
    responsibilities: [
      'Thiết kế và tổng hợp các chất liên kết acrylic và polyurethane gốc nước cho độ bền tia cực tím vượt trội.',
      'Tiến hành các thử nghiệm phân tích khả năng chịu thời tiết gia tốc, sương muối và khả năng chống mài mòn.',
      'Phối hợp với các bộ phận sản xuất để mở rộng quy mô từ công thức phòng thí nghiệm lên sản xuất công nghiệp.',
      'Đảm bảo tuân thủ nghiêm ngặt các tiêu chuẩn môi trường khu vực và các chỉ số kỹ thuật ISO 14001.'
    ],
    requirements: [
      'Thạc sĩ hoặc Tiến sĩ về Hóa học hữu cơ, Khoa học Polymer, hoặc Kỹ thuật Hóa học.',
      'Trên 5 năm kinh nghiệm thực tế R&D trong ngành chất phủ kiến trúc hoặc bảo vệ công nghiệp.',
      'Kiến thức sâu rộng về phân tán sắc tố, chất điều chỉnh lưu biến và cơ chế liên kết chéo.',
      'Hiểu biết rõ về tiêu chuẩn chịu thời tiết vùng nhiệt đới và các quy chuẩn xây dựng xanh.'
    ]
  },
  {
    id: 'job-2',
    title: 'Kỹ sư Kinh doanh Kỹ thuật B2B',
    department: 'Bộ phận Thương mại & Đối tác',
    location: 'Văn phòng chính GAMA (TP. Hồ Chí Minh)',
    type: 'Toàn thời gian',
    description: 'Gia nhập đội ngũ phát triển doanh nghiệp để kết nối giữa tầm nhìn kiến trúc và hiệu suất khoa học. Bạn sẽ tư vấn cho các nhà phát triển bất động sản hàng đầu, kiến trúc sư trưởng và các nhà thầu xây dựng để áp dụng các hệ thống sơn cao cấp của GAMA.',
    responsibilities: [
      'Quản lý các tài khoản khách hàng B2B lớn, đối chiếu các đặc tả dự án với các dòng sản phẩm GAMA phù hợp.',
      'Chuẩn bị hồ sơ kỹ thuật chi tiết, dự phóng hiệu quả kinh tế và chính sách bảo hành hiệu suất lâu dài.',
      'Trực tiếp thuyết trình tại công trường, thực hiện các ứng dụng sơn mẫu và tổ chức các buổi hội thảo kiến trúc.',
      'Hợp tác chặt chẽ với phòng thí nghiệm nghiên cứu để tinh chỉnh công thức cho các dự án vùng ven biển hoặc độ mặn cao.'
    ],
    requirements: [
      'Tốt nghiệp Cử nhân chuyên ngành Kỹ thuật Hóa học, Khoa học Vật liệu, Kỹ thuật Xây dựng hoặc các ngành kỹ thuật liên quan.',
      'Trên 3 năm kinh nghiệm trong lĩnh vực bán hàng kỹ thuật, tư vấn đặc tả kỹ thuật hoặc quản lý dự án trong ngành xây dựng.',
      'Kỹ năng giao tiếp và đàm phán xuất sắc với kinh nghiệm xây dựng mối quan hệ doanh nghiệp lâu dài.',
      'Mạng lưới quan hệ rộng rãi với các nhà thiết kế kiến trúc, kỹ sư kết cấu và nhà thầu chính là một lợi thế lớn.'
    ]
  },
  {
    id: 'job-3',
    title: 'Trưởng nhóm Kiểm soát Chất lượng (QC)',
    department: 'Vận hành Sản xuất',
    location: 'Nhà máy thông minh GAMA 1',
    type: 'Toàn thời gian',
    description: 'Giám sát các tiêu chuẩn sản xuất để đảm bảo mỗi thùng sơn GAMA xuất xưởng đều tuân thủ các cam kết chất lượng vượt trội. Bạn sẽ quản lý phòng thí nghiệm đảm bảo chất lượng, vận hành các thiết bị thử nghiệm tự động và phê duyệt chứng nhận chất lượng.',
    responsibilities: [
      'Giám sát kiểm tra nguyên liệu đầu vào và phân tích mẫu thử nghiệm về độ phủ, độ nhớt và tốc độ khô.',
      'Hiệu chuẩn máy quang phổ phòng thí nghiệm và thiết bị thử nghiệm cơ học để duy trì độ chính xác tuyệt đối.',
      'Điều tra các sai lệch lô sản xuất và phối hợp với đội ngũ phát triển công thức để điều chỉnh đầu vào sản xuất.',
      'Lập báo cáo nhật ký chất lượng hàng tháng và hỗ trợ các đợt kiểm định ISO 9001 và chứng nhận công trình xanh.'
    ],
    requirements: [
      'Tốt nghiệp Cử nhân chuyên ngành Hóa học, Khoa học Vật liệu hoặc Kỹ thuật Công nghiệp.',
      'Trên 3 năm kinh nghiệm kiểm soát chất lượng tại nhà máy sản xuất sơn, hóa chất hoặc polymer.',
      'Thành thạo các phương pháp kiểm nghiệm ASTM, ISO và JIS cho các đặc tính vật lý và hóa học của màng sơn.',
      'Tư duy chú trọng chi tiết, năng lực phân tích cao và kỹ năng giám sát tốt.'
    ]
  }
];

function transformPayloadJob(doc: any): JobOpening {
  const mapStringArray = (arr: any, key: string): string[] => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((item: any) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        return item[key] || item.text || item.value || JSON.stringify(item);
      }
      return '';
    }).filter(Boolean);
  };

  return {
    id: doc.id || String(doc._id || Math.random()),
    title: doc.title || 'Untitled Position',
    department: doc.department || 'General',
    location: doc.location || 'GAMA Office',
    type: doc.type || 'Toàn thời gian',
    description: doc.description || '',
    requirements: mapStringArray(doc.requirements, 'requirement'),
    responsibilities: mapStringArray(doc.responsibilities, 'responsibility')
  };
}

export async function fetchCareers(): Promise<{ jobs: JobOpening[]; source: 'Payload CMS' | 'Local Demo Mode'; error?: string }> {
  if (!PAYLOAD_CMS_URL) {
    const saved = localStorage.getItem('gama_local_careers');
    if (saved) {
      try {
        return { jobs: JSON.parse(saved), source: 'Local Demo Mode' };
      } catch {
        // ignore corruption
      }
    }
    return { jobs: INITIAL_JOB_OPENINGS, source: 'Local Demo Mode' };
  }

  const baseUrl = PAYLOAD_CMS_URL.replace(/\/$/, '');
  try {
    const response = await fetch(`${baseUrl}/api/careers?limit=100&depth=1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data.docs)) {
      const mappedJobs = data.docs.map(transformPayloadJob);
      return { jobs: mappedJobs, source: 'Payload CMS' };
    } else {
      throw new Error('Response format is missing standard "docs" array');
    }
  } catch (err: any) {
    console.warn('Payload CMS fetch careers failed, falling back to local careers:', err);
    const saved = localStorage.getItem('gama_local_careers');
    let localJobs = INITIAL_JOB_OPENINGS;
    if (saved) {
      try {
        localJobs = JSON.parse(saved);
      } catch {}
    }
    return { 
      jobs: localJobs, 
      source: 'Local Demo Mode', 
      error: `Failed to fetch from Payload CMS (${err.message || err}). Displaying local backups.` 
    };
  }
}

export async function submitJobApplication(
  jobId: string,
  jobTitle: string,
  name: string,
  email: string,
  cvUrl: string
): Promise<{ success: boolean; source: 'Payload CMS' | 'Local Demo Mode' }> {
  if (PAYLOAD_CMS_URL) {
    const baseUrl = PAYLOAD_CMS_URL.replace(/\/$/, '');
    try {
      const response = await fetch(`${baseUrl}/api/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          jobId,
          jobTitle,
          name,
          email,
          cvUrl
        })
      });

      if (response.ok) {
        return { success: true, source: 'Payload CMS' };
      } else {
        console.warn(`Payload CMS application POST failed with status ${response.status}`);
      }
    } catch (err) {
      console.warn('Payload CMS application POST failed, falling back:', err);
    }
  }

  const saved = localStorage.getItem('gama_local_applications');
  let applications = [];
  if (saved) {
    try {
      applications = JSON.parse(saved);
    } catch {}
  }

  applications.push({
    id: `app-${Date.now()}`,
    jobId,
    jobTitle,
    name,
    email,
    cvUrl,
    date: new Date().toISOString()
  });

  localStorage.setItem('gama_local_applications', JSON.stringify(applications));
  return { success: true, source: 'Local Demo Mode' };
}

export function resetLocalCareers(): JobOpening[] {
  localStorage.removeItem('gama_local_careers');
  localStorage.removeItem('gama_local_applications');
  return INITIAL_JOB_OPENINGS;
}
