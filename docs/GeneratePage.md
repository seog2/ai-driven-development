## 이미지 생성 화면 기능명세서

---

### 프론트엔드 기능명세서

#### 1. 화면 레이아웃 및 디자인 명세

- **메인 파일 위치**: `app/generate/page.tsx`
- **컴포넌트 구조**: 모듈형 컴포넌트 구조로 분리
  - `components/generate/GenerateHeader.tsx`
  - `components/generate/PromptInput.tsx`
  - `components/generate/StyleOptions.tsx`
  - `components/generate/GenerateButton.tsx`
  - `components/generate/ImageResult.tsx`

1. **헤더 섹션** (`GenerateHeader.tsx`)
   - **UI 구성**: 
     - 화면 상단에 뒤로가기 버튼과 "이미지 생성" 제목 배치
     - ShadCN의 `Button` 컴포넌트 사용
   - **상호작용**: 
     - 뒤로가기 버튼 클릭 시 메인 페이지로 이동

2. **프롬프트 입력 섹션** (`PromptInput.tsx`)
   - **UI 구성**: 
     - 헤더 아래에 프롬프트 입력 필드 배치
     - ShadCN의 `Textarea` 컴포넌트 사용하여 다줄 입력 지원
     - 프롬프트 입력 필드 아래에 프롬프트 작성 가이드라인 텍스트 추가
     - 글자수 카운터 표시 (현재 글자수/최대 글자수)
   - **상호작용**: 
     - 사용자가 프롬프트를 자유롭게 수정 가능
     - 입력된 프롬프트는 실시간으로 유효성 검사
   - **오류 처리**: 
     - 프롬프트가 비어있을 경우 "프롬프트를 입력해 주세요" 메시지 표시
     - 최대 글자수(500자) 초과 시 알림 메시지 표시

3. **스타일 옵션 선택 섹션** (`StyleOptions.tsx`)
   - **UI 구성**:
     - 프롬프트 입력 필드 아래에 스타일 옵션 그룹 배치
     - ShadCN의 `Select` 컴포넌트를 사용한 드롭다운 메뉴
     - 2개의 주요 옵션으로 단순화
   - **스타일 옵션 항목**:
     - 색감 선택 (따뜻한/차가운/모노톤)
     - 스타일 프리셋 (사실적/추상적/만화적)
   - **상호작용**:
     - 각 옵션 변경 시 실시간으로 상태 업데이트
     - 프리셋 선택 시 관련 옵션들 자동 조정

4. **이미지 생성 섹션** (`GenerateButton.tsx`)
   - **UI 구성**:
     - 스타일 옵션 아래에 '이미지 생성' 버튼 배치
     - ShadCN의 `Button` 컴포넌트 사용
     - 생성 중 로딩 상태를 표시할 애니메이션 및 텍스트
   - **상호작용**:
     - 버튼 클릭 시 이미지 생성 시뮬레이션 실행 (3초 소요)
     - 생성 중에는 버튼 비활성화 및 로딩 애니메이션 표시
   - **오류 처리**:
     - 프롬프트 유효성 검사 실패 시 토스트 알림 표시
     - 생성 실패 시 오류 토스트 메시지 표시

5. **생성된 이미지 결과 섹션** (`ImageResult.tsx`)
   - **UI 구성**:
     - 생성된 이미지를 큰 크기로 중앙에 표시
     - 이미지 아래에 액션 버튼 그룹 배치
       - 갤러리 저장 버튼
       - 커뮤니티 공유 버튼
       - 다운로드 버튼
       - 다시 생성 버튼
   - **상호작용**:
     - 이미지 클릭 시 원본 크기로 확대 보기 (향후 구현 예정)
     - 갤러리 저장 시 성공 토스트 알림 표시
     - 커뮤니티 공유 선택 시 공유 모달 표시
     - 다운로드 시 실제 파일로 로컬에 저장 (프롬프트 기반 파일명)
     - 다시 생성 시 현재 설정된 옵션으로 새로운 이미지 생성

6. **커뮤니티 공유 모달** (`ShareModal.tsx`)
   - **UI 구성**:
     - 모달 상단에 제목 입력 필드
     - 설명 텍스트 입력 영역
     - 태그 입력 필드
     - 공개 설정 토글
     - 게시 버튼
   - **상호작용**:
     - 필수 입력 필드 검증
     - 게시 버튼 클릭 시 커뮤니티에 이미지 공유 시뮬레이션
     - 모달 외부 클릭 또는 ESC 키로 닫기
     - 공유 완료 시 성공 토스트 알림 표시

7. **토스트 알림 시스템**
   - **UI 구성**:
     - 화면 우측 상단에 토스트 알림 표시
     - 4가지 타입 지원 (성공, 오류, 정보, 경고)
     - 자동 사라짐 기능 (3초 후)
   - **사용 위치**:
     - 이미지 생성 완료/실패
     - 갤러리 저장 완료
     - 커뮤니티 공유 완료
     - 다운로드 완료/실패
     - 프롬프트 유효성 검사 오류

#### 2. 사용자 흐름 및 상호작용

1. **프롬프트 수정 및 스타일 설정**
   - 메인 페이지에서 전달받은 프롬프트 확인 및 수정
   - 원하는 스타일 옵션 선택 및 조정 (색감, 스타일 프리셋)
   
2. **이미지 생성 프로세스**
   - 이미지 생성 버튼 클릭
   - 로딩 상태 표시 (3초 소요)
   - 생성 완료 시 성공 토스트 알림 표시

3. **생성된 이미지 관리**
   - 결과 이미지 확인
   - 갤러리 저장, 커뮤니티 공유, 또는 다운로드 선택
   - 필요시 같은 설정으로 다시 생성

4. **파일 다운로드**
   - 다운로드 버튼 클릭 시 실제 파일로 로컬에 저장
   - 파일명은 프롬프트 기반으로 자동 생성 (예: "artify-석양을-배경으로-한-고양이-1703123456789.jpg")
   - CORS 처리 및 Blob 변환을 통한 안전한 다운로드

---

### 백엔드 기능명세서

#### 1. 이미지 생성 API

- **파일 위치**: `app/api/generate/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
```typescript
{
  prompt: string;
  styleOptions: {
    colorTone: 'warm' | 'cool' | 'monochrome';
    stylePreset: 'realistic' | 'abstract' | 'cartoon';
  }
}
```
- **응답 데이터**:
```typescript
{
  success: boolean;
  imageUrl?: string;
  error?: string;
}
```

#### 2. 갤러리 저장 API

- **파일 위치**: `app/api/gallery/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
```typescript
{
  imageUrl: string;
  prompt: string;
  styleOptions: {
    colorTone: string;
    stylePreset: string;
  }
}
```
- **응답 데이터**: `{ success: boolean, message: string }`

#### 3. 커뮤니티 공유 API

- **파일 위치**: `app/api/community/post/route.ts`
- **HTTP 메서드**: `POST`
- **요청 데이터**:
```typescript
{
  imageUrl: string;
  prompt: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  styleOptions: {
    colorTone: string;
    stylePreset: string;
  }
}
```
- **응답 데이터**: `{ success: boolean, postId: string }`

#### 4. 데이터베이스 스키마

```typescript
// GeneratedImage 테이블
{
  id: string;
  userId: string;
  prompt: string;
  imageUrl: string;
  styleOptions: {
    colorTone: string;
    stylePreset: string;
  };
  createdAt: string;
  isShared: boolean;
}

// GalleryImage 테이블
{
  id: string;
  userId: string;
  generatedImageId: string;
  createdAt: string;
}

// CommunityPost 테이블 (이미지 공유 시)
{
  id: string;
  userId: string;
  generatedImageId: string;
  title: string;
  description: string;
  tags: string[];
  isPublic: boolean;
  likes: number;
  comments: number;
  createdAt: string;
}
```

#### 5. 파일 다운로드 기능

- **클라이언트 사이드 구현**: `lib/utils/download.ts`
- **주요 기능**:
  - 이미지 URL을 Blob으로 변환
  - CORS 처리를 통한 안전한 다운로드
  - 프롬프트 기반 파일명 자동 생성
  - 다양한 이미지 포맷 지원 (JPG, PNG, WebP)
- **파일명 생성 규칙**:
  - 형식: `artify-{프롬프트}-{타임스탬프}.{확장자}`
  - 특수문자 제거 및 공백을 하이픈으로 변환
  - 최대 길이 제한으로 안전한 파일명 보장 