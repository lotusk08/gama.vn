import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { getPayload } from 'payload';
import configPromise from '../../payload.config';
import { INITIAL_BLOG_POSTS, INITIAL_JOB_OPENINGS } from './payload';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Helper to construct a standard Lexical rich text object for database consistency
function createLexicalDoc(nodes: Array<
  | { type: 'p' | 'h3'; text: string }
  | { type: 'ul'; items: string[] }
>) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: nodes.map(node => {
        if (node.type === 'h3') {
          return {
            type: 'heading',
            tag: 'h3',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                text: node.text,
                version: 1,
              },
            ],
          };
        }
        if (node.type === 'ul') {
          return {
            type: 'list',
            tag: 'ul',
            listType: 'bullet',
            start: 1,
            format: '',
            indent: 0,
            version: 1,
            children: node.items.map(item => ({
              type: 'listitem',
              value: 1,
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  text: item,
                  version: 1,
                },
              ],
            })),
          };
        }
        // Default to paragraph
        return {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: node.text,
              version: 1,
            },
          ],
        };
      }),
    },
  };
}

const INITIAL_POLICIES = [
  {
    key: 'suppliers',
    title: 'Bộ Quy tắc dành cho Đối tác Cung ứng',
    subTitle: 'SUPPLIER CODE OF CONDUCT & SUSTAINABILITY',
    introduction: 'Tại GAMA Group, chúng tôi tin tưởng rằng việc thiết lập và duy trì một chuỗi cung ứng bền vững, minh bạch và có trách nhiệm xã hội chính là chìa khóa then chốt để củng cố giá trị cốt lõi của doanh nghiệp. Chúng tôi cam kết hợp tác chặt chẽ với các nhà cung ứng dựa trên các tiêu chí cao nhất về đạo đức, an toàn, và bảo vệ môi trường toàn cầu.',
    content: createLexicalDoc([
      {
        type: 'h3',
        text: '1. Tuân thủ Pháp luật & Quy chuẩn Đạo đức',
      },
      {
        type: 'p',
        text: 'Tất cả các đối tác cung cấp nguyên vật liệu, hóa chất, bao bì hay dịch vụ logistics cho GAMA Group đều bắt buộc phải tuân thủ nghiêm ngặt mọi quy định luật pháp hiện hành tại quốc gia sở tại và các điều ước quốc tế mà Việt Nam là thành viên. Chúng tôi tuyệt đối không dung túng cho bất kỳ hành vi hối lộ, tham nhũng, độc quyền hay cạnh tranh thiếu lành mạnh nào trong toàn bộ chuỗi cung ứng.',
      },
      {
        type: 'h3',
        text: '2. Bảo vệ Môi trường & Phát triển Bền vững',
      },
      {
        type: 'p',
        text: 'Nhà cung ứng của GAMA Group phải cam kết thiết lập các biện pháp kiểm soát và giảm thiểu tác động tiêu cực đến môi trường tự nhiên. Điều này bao gồm:',
      },
      {
        type: 'ul',
        items: [
          'Sử dụng hợp lý và tiết kiệm nguồn tài nguyên thiên nhiên, năng lượng và nước.',
          'Áp dụng các công nghệ xử lý chất thải hiện đại, đảm bảo nước thải và khí thải đạt chuẩn an toàn trước khi xả ra môi trường.',
          'Nghiêm cấm hoàn toàn việc sử dụng các hóa chất độc hại ngoài danh mục kiểm soát hoặc các chất có nguy cơ gây hại cao cho tầng ozone.',
          'Ưu tiên các giải pháp bao bì có khả năng tái chế, phân hủy sinh học và giảm thiểu tối đa dấu chân Carbon.',
        ],
      },
      {
        type: 'h3',
        text: '3. Tiêu chuẩn Lao động & Quyền con người',
      },
      {
        type: 'p',
        text: 'Đối tác cung ứng phải tôn trọng quyền con người và đối xử nhân đạo với mọi người lao động. GAMA Group kiên quyết phản đối việc sử dụng lao động cưỡng bức, lao động trẻ em dưới mọi hình thức. Nhà cung ứng phải đảm bảo:',
      },
      {
        type: 'ul',
        items: [
          'Môi trường làm việc an toàn, vệ sinh và lành mạnh, trang bị đầy đủ thiết bị bảo hộ lao động cho công nhân.',
          'Trả lương và các chế độ đãi ngộ đúng hạn, công bằng và tuân thủ luật lao động hiện hành.',
          'Tôn trọng quyền tự do hiệp hội và thỏa ước lao động tập thể của nhân viên.',
        ],
      },
    ]),
  },
  {
    key: 'privacy',
    title: 'Tuyên bố Quyền Riêng tư & Bảo mật dữ liệu',
    subTitle: 'PRIVACY & DATA PROTECTION STATEMENT',
    introduction: 'Sự tin tưởng và an tâm của quý khách hàng, đối tác cùng toàn thể cán bộ nhân viên là tài sản vô giá của GAMA Group. Chúng tôi cam kết thu thập, xử lý và lưu trữ dữ liệu cá nhân một cách có trách nhiệm, minh bạch và tuân thủ chặt chẽ các quy định pháp luật về bảo vệ dữ liệu cá nhân (bao gồm Nghị định 13/2023/NĐ-CP của Chính phủ).',
    content: createLexicalDoc([
      {
        type: 'h3',
        text: '1. Phạm vi Thu thập & Mục đích Sử dụng',
      },
      {
        type: 'p',
        text: 'GAMA Group chỉ thực hiện thu thập các thông tin cá nhân cần thiết (như họ tên, số điện thoại, email, địa chỉ) khi được sự đồng ý tự nguyện của chủ thể dữ liệu nhằm phục vụ cho các mục đích:',
      },
      {
        type: 'ul',
        items: [
          'Cung cấp và nâng cao chất lượng sản phẩm sơn, thiết bị vệ sinh, phụ kiện và dịch vụ hỗ trợ kỹ thuật.',
          'Xử lý và hoàn tất các đơn đặt hàng, hợp đồng kinh doanh và dịch vụ bảo hành hậu mãi.',
          'Gửi các bản tin nội bộ, chương trình ưu đãi đặc quyền và thông báo cập nhật công nghệ mới.',
        ],
      },
      {
        type: 'h3',
        text: '2. Cam kết Bảo mật Tuyệt đối',
      },
      {
        type: 'p',
        text: 'Chúng tôi áp dụng các biện pháp an ninh mạng kỹ thuật cao kết hợp quy trình quản lý nội bộ chặt chẽ để ngăn chặn mọi hành vi truy cập trái phép, tiết lộ, thay đổi, hoặc hủy hoại dữ liệu cá nhân. Hệ thống máy chủ lưu trữ dữ liệu của GAMA được bảo vệ bởi tường lửa đa lớp, mã hóa dữ liệu đầu-cuối (SSL/TLS) và kiểm tra lỗ hổng bảo mật định kỳ.',
      },
      {
        type: 'h3',
        text: '3. Quyền của Chủ thể Dữ liệu',
      },
      {
        type: 'p',
        text: 'Chủ thể dữ liệu có toàn quyền kiểm soát thông tin cá nhân của mình, bao gồm quyền yêu cầu truy cập, đính chính, cập nhật, hoặc yêu cầu xóa bỏ vĩnh viễn dữ liệu cá nhân của mình khỏi hệ thống lưu trữ của GAMA Group bất kỳ lúc nào bằng cách gửi yêu cầu trực tiếp đến bộ phận chăm sóc khách hàng của chúng tôi.',
      },
    ]),
  },
  {
    key: 'position',
    title: 'Tuyên bố Vị thế & Định hướng Phát triển',
    subTitle: 'CORPORATE POSITION STATEMENTS',
    introduction: 'Với tư cách là tập đoàn đa ngành dẫn đầu tại Việt Nam trong lĩnh vực sản xuất vật liệu phủ (Sơn nước trang trí), thiết bị phòng tắm đồng bộ và gương thông minh cao cấp, GAMA Group kiên định định vị thương hiệu ở phân khúc chất lượng cao nhất, kiến tạo những không gian sống tinh tế và bảo vệ vững chắc mọi công trình kiến trúc.',
    content: createLexicalDoc([
      {
        type: 'h3',
        text: '1. Tiên phong Công nghệ & Đổi mới sáng tạo',
      },
      {
        type: 'p',
        text: 'GAMA Group cam kết không ngừng đầu tư vào các trung tâm Nghiên cứu & Phát triển (R&D) hiện đại hàng đầu khu vực. Chúng tôi ứng dụng các đột phá khoa học tiên tiến như polyme liên kết chéo Core-Shell trong ngành sơn, công nghệ men tự kháng khuẩn trong thiết bị vệ sinh, và các tính năng cảm ứng phá sương thông minh trên gương LED để luôn giữ vững lợi thế cạnh tranh vượt trội.',
      },
      {
        type: 'h3',
        text: '2. Chuyển đổi xanh & Trách nhiệm Sinh thái',
      },
      {
        type: 'p',
        text: 'Mọi hoạt động sản xuất kinh doanh của GAMA Group đều đặt bảo vệ môi trường làm kim chỉ nam. Chúng tôi đặt mục tiêu cắt giảm 50% lượng phát thải khí nhà kính (CO2) vào năm 2030 và hướng tới trung hòa Carbon hoàn toàn vào năm 2050. GAMA tự hào đồng hành cùng xu hướng kiến trúc xanh bền vững toàn cầu.',
      },
      {
        type: 'h3',
        text: '3. Kiến tạo Giá trị Xã hội & Phát triển Cộng đồng',
      },
      {
        type: 'p',
        text: 'Chúng tôi hướng tới việc mang lại giá trị thiết thực và phồn vinh bền vững cho cộng đồng xã hội, nâng cao điều kiện sống của người dân thông qua các chương trình thiện nguyện xây sửa trường học, nhà tình nghĩa, và tài trợ màu sơn bảo vệ các công trình di sản văn hóa Việt Nam.',
      },
    ]),
  },
  {
    key: 'conduct',
    title: 'Bộ Quy tắc Ứng xử Doanh nghiệp',
    subTitle: 'GLOBAL BUSINESS CODE OF CONDUCT',
    introduction: 'Bộ Quy tắc Ứng xử này là kim chỉ nam cho mọi hành vi ứng xử, quyết định nghiệp vụ và hoạt động kinh doanh hàng ngày của toàn thể ban điều hành cùng toàn thể cán bộ nhân viên của GAMA Group trên toàn thế giới, đảm bảo chúng tôi luôn vận hành dựa trên các giá trị đạo đức cao nhất.',
    content: createLexicalDoc([
      {
        type: 'h3',
        text: '1. Chính trực & Trung thực trong Kinh doanh',
      },
      {
        type: 'p',
        text: 'Sự chính trực là nền tảng cốt lõi cho mọi mối quan hệ đối tác của GAMA. Chúng tôi cam kết cạnh tranh công bằng, lành mạnh và tuân thủ tuyệt đối luật chống độc quyền. Mọi thông tin tài chính, báo cáo hoạt động và tài liệu kế toán của tập đoàn đều phải được lập một cách trung thực, chính xác, khách quan và minh bạch nhất.',
      },
      {
        type: 'h3',
        text: '2. Phòng chống Tham nhũng & Hối lộ',
      },
      {
        type: 'p',
        text: 'GAMA Group áp dụng chính sách KHÔNG khoan nhượng (Zero-tolerance) đối với bất kỳ hành vi đưa hoặc nhận hối lộ, lại quả, tư lợi cá nhân hay xung đột lợi ích dưới mọi hình thức. Nhân viên không được phép nhận quà tặng, tiền mặt hoặc các khoản lợi ích vật chất có giá trị lớn từ phía đối tác khách hàng hay nhà cung ứng có khả năng ảnh hưởng đến tính khách quan khi ra quyết định kinh doanh.',
      },
      {
        type: 'h3',
        text: '3. Tôn trọng sự Đa dạng & Bình đẳng lao động',
      },
      {
        type: 'p',
        text: 'Chúng tôi nỗ lực xây dựng một môi trường làm việc chuyên nghiệp, nhân văn, nơi mọi nhân viên đều được tôn trọng, lắng nghe và có cơ hội phát triển công bằng như nhau, không phân biệt giới tính, tuổi tác, vùng miền, tôn giáo hay tình trạng sức khỏe. Mọi hành vi quấy rối, bắt nạt hoặc phân biệt đối xử đều bị xử lý kỷ luật nghiêm khắc theo quy chế lao động của tập đoàn.',
      },
    ]),
  },
  {
    key: 'speakup',
    title: 'Hệ thống SpeakUp! ẩn danh bảo mật',
    subTitle: 'SPEAKUP! NOTICE & COMPLIANCE REPORTING',
    introduction: 'GAMA Group khuyến khích mọi nhân viên, đối tác, nhà cung cấp và khách hàng lên tiếng ngay khi phát hiện bất kỳ dấu hiệu vi phạm pháp luật, vi phạm Bộ Quy tắc Ứng xử Doanh nghiệp, hoặc các hành vi thiếu đạo đức kinh doanh gây hại cho lợi ích chung. Cổng thông tin SpeakUp! được vận hành độc lập bởi một bên thứ ba chuyên nghiệp nhằm đảm bảo thông tin báo cáo của bạn được mã hóa an toàn và bảo mật ẩn danh 100%.',
    content: createLexicalDoc([
      {
        type: 'h3',
        text: '1. Các Hành vi cần Báo cáo',
      },
      {
        type: 'p',
        text: 'Vui lòng thực hiện phản ánh qua SpeakUp! nếu bạn chứng kiến hoặc có chứng cứ về các hành vi vi phạm:',
      },
      {
        type: 'ul',
        items: [
          'Đưa hối lộ, nhận hối lộ, tham ô công quỹ hoặc trục lợi cá nhân.',
          'Gian lận sổ sách kế toán, báo cáo tài chính hoặc hồ sơ chất lượng sản phẩm.',
          'Vi phạm các tiêu chuẩn an toàn lao động, gây ô nhiễm môi trường nghiêm trọng.',
          'Phân biệt đối xử, quấy rối tình dục hoặc hành vi ngược đãi tại nơi làm việc.',
        ],
      },
      {
        type: 'h3',
        text: '2. Cam kết Bảo vệ Người Báo cáo',
      },
      {
        type: 'p',
        text: 'Ban lãnh đạo GAMA cam kết tuyệt đối bảo vệ danh tính của người báo cáo trung thực. Mọi hành vi đe dọa, trù dập hay kỳ thị người báo cáo đều bị coi là vi phạm kỷ luật đặc biệt nghiêm trọng và sẽ bị sa thải lập tức, thậm chí chuyển giao cơ quan pháp luật xử lý hình sự.',
      },
      {
        type: 'h3',
        text: '3. Kênh tiếp nhận báo cáo trực tiếp',
      },
      {
        type: 'p',
        text: 'Bạn có thể gửi báo cáo ẩn danh trực tuyến thông qua cổng thông tin độc lập của Ethicspoint:',
      },
    ]),
  },
  {
    key: 'accessibility',
    title: 'Cam kết về Khả năng Tiếp cận Toàn diện',
    subTitle: 'DIGITAL ACCESSIBILITY STATEMENT',
    introduction: 'GAMA Group luôn mong muốn mang lại một môi trường bình đẳng, thân thiện và không có rào cản cho tất cả mọi người, bao gồm cả những người khuyết tật hay có hoàn cảnh đặc biệt khi tiếp cận thông tin, sản phẩm và dịch vụ số của chúng tôi.',
    content: createLexicalDoc([
      {
        type: 'h3',
        text: '1. Áp dụng Tiêu chuẩn WCAG Toàn cầu',
      },
      {
        type: 'p',
        text: 'Chúng tôi liên tục làm việc nhằm tối ưu hóa các nền tảng kỹ thuật số (website, ứng dụng di động) của tập đoàn tuân thủ nghiêm ngặt các nguyên tắc của Hướng dẫn Tiếp cận Nội dung Web (WCAG 2.1) cấp độ AA. Các cải tiến kỹ thuật cụ thể bao gồm:',
      },
      {
        type: 'ul',
        items: [
          'Đảm bảo tỷ lệ tương phản màu sắc cao giúp người thị lực kém đọc văn bản dễ dàng.',
          'Cung cấp đầy đủ văn bản thay thế (alt-text) cho tất cả các hình ảnh, đồ họa trên trang.',
          'Hỗ trợ hoàn toàn việc điều hướng website bằng bàn phím thông minh không cần chuột điều khiển.',
          'Khả năng tương thích tốt với các công cụ đọc màn hình chuyên dụng (JAWS, NVDA, VoiceOver).',
        ],
      },
      {
        type: 'h3',
        text: '2. Đồng hành & Lắng nghe phản hồi',
      },
      {
        type: 'p',
        text: 'Quá trình tối ưu hóa khả năng tiếp cận số là một hành trình cải tiến không ngừng nghỉ. Nếu bạn gặp bất kỳ trở ngại hay khó khăn nào trong việc sử dụng hoặc khai thác thông tin trên website của GAMA Group, vui lòng liên hệ ngay với nhóm hỗ trợ của chúng tôi để được hỗ trợ kịp thời:',
      },
      {
        type: 'ul',
        items: [
          'Hotline hỗ trợ đặc quyền: 1800 9000',
          'Email hỗ trợ tiếp cận: accessibility@gama.vn',
        ],
      },
    ]),
  },
];

async function seed() {
  console.log('Starting database seeding...');
  const payload = await getPayload({ config: configPromise });

  // 1. Create default admin user if none exists
  const users = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (users.totalDocs === 0) {
    console.log('Creating default admin user...');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@gama.vn',
        password: 'Password123!',
        name: 'GAMA Administrator',
      },
    });
    console.log('Default Admin User created successfully: admin@gama.vn / Password123!');
  } else {
    console.log('Admin user already exists in database.');
  }

  // 2. Seed Blog Posts
  const postsCount = await payload.find({
    collection: 'posts',
    limit: 1,
  });

  if (postsCount.totalDocs === 0) {
    console.log('Seeding initial blog posts...');
    for (const post of INITIAL_BLOG_POSTS) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          excerpt: post.excerpt,
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: post.content,
                      version: 1,
                    }
                  ]
                }
              ]
            }
          } as any,
          category: post.category,
          date: post.date,
          readTime: post.readTime,
          author: {
            name: post.author.name,
            role: post.author.role,
          },
        },
      });
    }
    console.log(`Seeded ${INITIAL_BLOG_POSTS.length} blog posts.`);
  } else {
    console.log('Blog posts already exist in database.');
  }

  // 3. Seed Careers
  const careersCount = await payload.find({
    collection: 'careers',
    limit: 1,
  });

  if (careersCount.totalDocs === 0) {
    console.log('Seeding initial careers...');
    for (const job of INITIAL_JOB_OPENINGS) {
      await payload.create({
        collection: 'careers',
        data: {
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type as any,
          description: job.description,
          responsibilities: job.responsibilities.map(r => ({ responsibility: r })),
          requirements: job.requirements.map(req => ({ requirement: req })),
        },
      });
    }
    console.log(`Seeded ${INITIAL_JOB_OPENINGS.length} job openings.`);
  } else {
    console.log('Careers already exist in database.');
  }

  // 4. Seed Corporate Policies
  console.log('Seeding initial policies...');
  for (const policy of INITIAL_POLICIES) {
    const existing = await payload.find({
      collection: 'policies',
      where: {
        key: {
          equals: policy.key,
        },
      },
    });

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'policies',
        data: {
          key: policy.key as any,
          title: policy.title,
          subTitle: policy.subTitle,
          introduction: policy.introduction,
          content: policy.content as any,
        },
      });
      console.log(`Seeded policy: ${policy.key}`);
    } else {
      console.log(`Policy ${policy.key} already exists, skipping.`);
    }
  }

  // 5. Seed Media files (downloading them from unsplash if they don't exist in local public/media/)
  const mediaToSeed = [
    {
      alt: 'hero-banner',
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      filename: 'hero-banner.jpg',
    },
    {
      alt: 'color-year',
      url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      filename: 'color-year.jpg',
    },
    {
      alt: 'innovation-1',
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      filename: 'innovation-1.jpg',
    },
    {
      alt: 'innovation-2',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      filename: 'innovation-2.jpg',
    },
    {
      alt: 'innovation-3',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      filename: 'innovation-3.jpg',
    },
  ];

  console.log('Checking and seeding page media assets...');
  for (const item of mediaToSeed) {
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        alt: {
          equals: item.alt,
        },
      },
    });

    if (existingMedia.totalDocs === 0) {
      console.log(`Downloading and seeding media asset: ${item.alt}...`);
      const targetDir = path.resolve(dirname, '../../public/media');
      const targetFilePath = path.join(targetDir, item.filename);

      try {
        // Ensure local folder exists
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }

        // Fetch image bytes
        const response = await fetch(item.url);
        if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(targetFilePath, buffer);

        // Insert into Payload media collection
        const stats = fs.statSync(targetFilePath);
        await payload.create({
          collection: 'media',
          data: {
            alt: item.alt,
          },
          file: {
            name: item.filename,
            mimetype: 'image/jpeg',
            size: stats.size,
            data: buffer,
          },
        });
        console.log(`Media asset ${item.alt} successfully seeded!`);
      } catch (err) {
        console.error(`Failed to download or seed media ${item.alt}:`, err);
      }
    } else {
      console.log(`Media asset ${item.alt} already exists, skipping.`);
    }
  }

  console.log('Database seeding completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
