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


  // 6. Seed Header Global
  console.log('Seeding Header global...');
  const heroBannerMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'hero-banner' } },
    limit: 1,
  });
  const heroBannerId = heroBannerMedia.docs[0]?.id;

  const colorYearMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'color-year' } },
    limit: 1,
  });
  const colorYearId = colorYearMedia.docs[0]?.id;

  await payload.updateGlobal({
    slug: 'header',
    data: {
      siteTitle: 'GAMA.vn - Nơi chuyên môn hóa học kiến tạo tương lai',
      siteDescription: 'GAMA cung cấp giải pháp sơn phủ, chống thấm kiến trúc và công nghiệp cao cấp tiêu chuẩn xanh.',
      logo: heroBannerId, // can fall back or use a specific logo image if one exists
      navItems: [
        { 
          label: 'Về GAMA', 
          tabId: 'about',
          hasSubMenu: true,
          subMenuItems: [
            { label: 'Lịch sử', tabId: 'about-history' },
            { label: 'Thương hiệu', tabId: 'about-brands' },
            { label: 'Lời hứa từ sứ mệnh', tabId: 'about-creed' },
            { label: 'Công ty thành viên', tabId: 'about-subsidiaries' },
            { label: 'Năng lực & chứng chỉ', tabId: 'about-certificates' },
          ]
        },
        { label: 'Phát triển bền vững', tabId: 'sustainability' },
        { label: 'Sáng tạo & Đột phá', tabId: 'innovation' },
        { label: 'Tin tức', tabId: 'blog' },
        { label: 'Tuyển dụng', tabId: 'careers' },
      ],
      topBarTicker: {
        stockSymbol: 'HOSE: GAMA',
        stockChange: '+1.45% (28,400đ)',
        certificationText: 'Tiêu chuẩn quốc tế ISO 9001:2015 & Hợp quy QCVN 16 Bộ Xây dựng',
      },
      topBarLinks: [
        { label: 'Báo Cáo Thường Niên 2026', tabId: 'about' },
        { label: 'Yêu cầu báo giá dự án', tabId: 'contact' },
      ],
    },
  });
  console.log('Header global seeded!');

  // 7. Seed Footer Global
  console.log('Seeding Footer global...');
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: 'Mưa nắng ngoài thềm. Bình yên trong tổ ấm.',
      email: 'contact@gama.vn',
      phone: '1800 9000',
      address: 'Văn phòng chính GAMA, TP. Hồ Chí Minh',
      socialLinks: {
        linkedin: '#',
        facebook: '#',
        instagram: '#',
        twitter: '#',
      },
      copyright: '© 2026 GAMA GROUP CO., LTD',
      newsletterTitle: 'Bản tin định kỳ',
      newsletterText: 'Đăng ký để nhận các bản tin nội bộ định kỳ, báo cáo thường niên và cập nhật đổi mới từ GAMA GROUP CO., LTD.',
      footerLinks: [
        { label: 'Về GAMA', tabId: 'about' },
        { label: 'Phát triển bền vững', tabId: 'sustainability' },
        { label: 'Sáng tạo & Đột phá', tabId: 'innovation' },
        { label: 'Tin tức', tabId: 'blog' },
        { label: 'Tuyển dụng', tabId: 'careers' },
        { label: 'Liên hệ', tabId: 'contact' },
      ],
      certifications: [
        { label: 'Đạt chuẩn ISO 9001', icon: 'ShieldCheck' },
        { label: 'Tiêu chuẩn xanh LEED', icon: 'Star' },
      ],
    },
  });
  console.log('Footer global seeded!');

  // 8. Seed Pages (Home Page with all blocks)
  console.log('Seeding Home Page with demo layout blocks...');
  const existingHome = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    limit: 1,
  });

  const homePageData = {
    title: 'Trang chủ',
    slug: 'home',
    layout: [
      {
        blockType: 'hero',
        title: 'Sắc màu tĩnh lặng. Chạm vào xúc cảm, giữ trọn bình yên.',
        subtitle: 'Thương hiệu GAMA • Từ năm 1994',
        description: 'Khi màng sơn không chỉ là lớp phủ vô tri, nó trở thành ngôn ngữ của không gian, che chở những điều quý giá nhất. GAMA chế tác những dải sắc độ bền bỉ cùng thời gian, thấu hiểu sâu sắc từng nếp nhà nhiệt đới và đồng hành cùng khát vọng gìn giữ di sản tổ ấm qua các thế hệ.',
        ctaPrimaryLabel: 'Khám phá lĩnh vực',
        ctaSecondaryLabel: 'Liên hệ ngay',
        badgeLabel: 'Khơi Gợi',
        badgeSubLabel: 'Sắc Độ Tâm Hồn',
        badgeLabel2: 'Che Chở',
        badgeSubLabel2: 'Vững Chãi Nắng Mưa',
        backgroundImage: heroBannerId,
      },
      {
        blockType: 'core-values',
        sectionLabel: '• TRỤ CỘT ĐỊNH VỊ & GIÁ TRỊ CỐT LÕI GAMA',
        sectionTitle: 'Kiên định trong từng cam kết, đồng hành cùng mỗi mái ấm Việt.',
        pillars: [
          {
            num: 'PILLAR 01',
            category: 'CẢM XÚC & SỰ AN TÂM',
            title: 'Chất lượng có thể kiểm chứng',
            description: 'Sự bảo vệ không phải là một lời hứa suông trên giấy tờ. Đó là sự kiên định của ngôi nhà trước những cơn bão nhiệt đới dữ dội nhất, là lớp lá chắn vô hình dệt từ khoa học polymer tiên tiến để giữ trọn vẹn sự bình yên trong từng giấc ngủ của gia đình bạn.',
            quote: '"Durability is not written in certificates; it is the silent guard that keeps your family safe while the storm rages outside."',
            iconName: 'ShieldCheck',
          },
          {
            num: 'PILLAR 02',
            category: 'SỰ TÔN TRỌNG NGHỀ NGHIỆP',
            title: 'Đồng hành cùng người thợ',
            description: 'Chúng tôi thấu hiểu từng giọt mồ hôi trên bờ vai ướt đẫm, thấu hiểu khát khao thổi hồn vào những khối bê tông vô tri của những người thợ sơn Việt Nam. GAMA đứng bên cạnh họ với sự thấu cảm sâu sắc, cung cấp những giải pháp tinh xảo nhất để thăng hoa tay nghề của người nghệ nhân đích thực.',
            quote: '"We stand with those whose hands turn bare walls into warm sanctuaries, honoring their artistry with deep mutual respect."',
            iconName: 'Paintbrush',
          },
          {
            num: 'PILLAR 03',
            category: 'NGÔN NGỮ CỦA KHÔNG GIAN',
            title: 'Màu sắc như một ngôn ngữ',
            description: 'Màu sắc tại GAMA không đơn thuần là những hạt sắc tố hóa học vô tri. Chúng là ký ức, là cảm xúc dạt dào, là sự tĩnh lặng của tâm hồn sau một ngày dài mỏi mệt. Chúng tôi chắt lọc từng dải màu để chạm tới nơi sâu thẳm nhất trong trái tim của mỗi chủ nhà có gu thẩm mỹ duy mỹ.',
            quote: '"Colors are not just paint; they are memory, mood, and the quiet, elegant language of your soul spoken aloud."',
            iconName: 'Palette',
          },
          {
            num: 'PILLAR 04',
            category: 'BẢN SẮC & KHÁT VỌNG',
            title: 'Gốc rễ Việt, tiêu chuẩn vươn xa',
            description: 'Khởi nguồn từ trí tuệ và khát vọng của người Việt Nam, thấu hiểu sâu sắc từng cơn mưa rào dồn dập, cái nắng oi ả và hơi mặn mòi của biển cả quê hương. Từ mảnh đất kiên cường này, chúng tôi kiến tạo nên những sản phẩm chất lượng vượt tầm quốc tế, kiêu hãnh nâng tầm vị thế thương hiệu Việt.',
            quote: '"Deeply rooted in Vietnamese soil, crafted with a local soul to transcend and conquer global ecological standards."',
            iconName: 'Globe',
          },
        ],
      },
      {
        blockType: 'color-year',
        title: 'Màu của năm GAMA 2026',
        description: 'Tìm hiểu về sắc thái màu độc bản lấy cảm hứng từ thiên nhiên nhiệt đới.',
        backgroundImage: colorYearId,
        shades: [
          {
            name: 'Deep Ocean',
            vietnameseName: 'Xanh Đại Dương Sâu',
            hex: '#213C4D',
            description: 'Sắc xanh dương thẳm của lòng đại dương tĩnh lặng. Mang lại cảm giác kiên định, chiều sâu tri thức và sự bảo vệ vững chắc cho các công trình biệt thự, phòng khách cao cấp.',
            complementary: 'Đất sét nung (Terracotta), Gỗ Sồi tự nhiên',
          },
          {
            name: 'Nordic Mist',
            vietnameseName: 'Sương Mù Bắc Âu',
            hex: '#8BA1AC',
            description: 'Một tông xanh trung tính dịu mát pha ánh xám bạc của làn sương sớm phương Bắc. Lý tưởng cho không gian làm việc sáng tạo, phòng ngủ thiền định, kiến tạo sự khoáng đạt và cân bằng.',
            complementary: 'Trắng sứ thanh khiết, Đồng mạ mờ',
          },
          {
            name: 'Calm Sky',
            vietnameseName: 'Bầu Trời Tĩnh Lặng',
            hex: '#D1E0E6',
            description: 'Sắc xanh dịu nhẹ của bầu trời hừng đông. Mang lại cảm giác thư thái, nhẹ nhàng và ngập tràn năng lượng tích cực cho phòng ngủ của trẻ nhỏ và không gian nghỉ ngơi.',
            complementary: 'Trắng tinh khiết, Màu gỗ nhạt',
          },
        ],
      },
      {
        blockType: 'stats',
        title: 'CÁC DỰ ÁN TIÊU BIỂU & ĐỐI TÁC KIẾN TRÚC',
        clients: [
          { name: 'City Land Garden Hills', category: 'Cung cấp Sơn & Sứ vệ sinh' },
          { name: 'Topaz Home 1', category: 'Cung cấp Sơn phủ ngoại thất' },
          { name: 'Topaz Elite', category: 'Cung cấp Sơn & Thiết bị vệ sinh' },
          { name: 'Khu Đô Thị Bình An (Thủ Đức)', category: 'Sơn lót chống kiềm' },
          { name: 'Bảy Hiền Tower', category: 'Cung cấp Thiết bị phòng tắm' },
          { name: 'Văn Phòng 339 Điện Biên Phủ', category: 'Sơn phủ kiến trúc cao cấp' },
          { name: 'Golden Island', category: 'Sơn phủ & Chống thấm màu' },
          { name: 'Đại Học CNTT Thủ Đức', category: 'Sơn phủ bảo vệ & Chống thấm' },
          { name: 'Big C Đà Lạt', category: 'Vật tư sơn chống rêu mốc' },
          { name: 'Nhà Xưởng Jinyu', category: 'Bột trét & Sơn lót ngoại thất' },
          { name: 'Big C An Lạc', category: 'Sơn chống thấm đa năng' },
          { name: 'Big C Tân Hiệp', category: 'Thiết bị vệ sinh đồng bộ' },
          { name: 'Big C Quy Nhơn', category: 'Sơn phủ ngoài trời chịu nhiệt' },
        ],
      },
      {
        blockType: 'testimonials',
        title: 'Sự thấu cảm sâu sắc từ những người kiến thiết tổ ấm.',
        subtitle: '• CẢM NHẬN CHIÊM NGHIỆM',
        items: [
          {
            quote: '“Người ta thường nghĩ sơn chỉ là lớp ngoài cùng, nhưng với tôi, đó là chiếc áo dệt bằng xúc cảm của ngôi nhà. GAMA không chỉ tạo ra màu sắc, họ hiểu cách lưu giữ thời gian trên từng thớ tường phẳng mịn như lụa.”',
            author: 'KTS. Lê Hoài Nam',
            role: 'Nhà sáng lập & Giám đốc Sáng tạo',
            company: 'Atelier Nam Concept',
          },
          {
            quote: '“Hơn ba mươi năm cầm cọ thi công, tôi chưa từng chạm tay vào màng sơn nào có độ che phủ tự nhiên và mịn màng như men sứ của GAMA. Khi thi công dòng G14, màng sơn tự san phẳng phẳng lì, không để lại một vệt cọ nhỏ.”',
            author: 'Nghệ nhân Nguyễn Văn Quân',
            role: 'Trưởng nhóm thi công di sản kiến trúc',
            company: 'Hội Mỹ thuật Xây dựng Việt Nam',
          },
          {
            quote: '“Giữa sương muối buốt giá của Đà Lạt, ngôi biệt thự gỗ đá của chúng tôi vẫn giữ nguyên vẹn sắc độ trầm ấm ban đầu nhờ lớp bảo vệ siêu bóng Nano từ GAMA. Một sự tĩnh lặng sang trọng, bền bỉ và vô cùng an tâm.”',
            author: 'Bà Nguyễn Hương Giang',
            role: 'Chủ sở hữu',
            company: 'The Pine Hill Mansion (Đà Lạt)',
          },
          {
            quote: '“Khi kiến tạo các công trình xanh đạt tiêu chuẩn sinh thái cao, chúng tôi đặt tiêu chí sức khỏe lên hàng đầu. Sơn nội thất sinh học của GAMA hoàn toàn không mùi, hàm lượng VOC gần như bằng không, mang lại bầu không khí trong lành nguyên bản ngay sau khi bàn giao.”',
            author: 'Kỹ sư Trần Hoàng Bách',
            role: 'Giám đốc Phát triển Bền vững',
            company: 'Tập đoàn Địa ốc ECO-Green Việt Nam',
          },
        ],
      },
      {
        blockType: 'cta-banner',
        headline: 'Mưa nắng ngoài thềm. Bình yên trong tổ ấm.',
        subtext: 'Những gì chúng tôi tinh chế hôm nay sẽ âm thầm che chở từng nhịp thở của ngôi nhà bạn mai sau. Lớp bảo vệ kiên cường của GAMA mang lại sự vững chãi bền lâu, nâng niu trọn vẹn từng khoảnh khắc bình yên.',
        buttonLabel: 'Khởi đầu hành trình kiến tạo',
        buttonTab: 'contact',
      },
    ],
  };

  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: homePageData as any,
    });
    console.log('Home page seeded with default blocks!');
  } else {
    // Update it so it contains all matching blocks
    await payload.update({
      collection: 'pages',
      id: existingHome.docs[0].id,
      data: homePageData as any,
    });
    console.log('Home page updated/synchronized with default blocks!');
  }

  console.log('Database seeding completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
