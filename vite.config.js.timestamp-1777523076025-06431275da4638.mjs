// vite.config.js
import { defineConfig, normalizePath, build } from "file:///C:/Bootstrap-Task3/node_modules/vite/dist/node/index.js";
import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import nunjucks from "file:///C:/Bootstrap-Task3/node_modules/vite-plugin-nunjucks/dist/index.mjs";
import { viteStaticCopy } from "file:///C:/Bootstrap-Task3/node_modules/vite-plugin-static-copy/dist/index.js";

// src/sidebar-items.json
var sidebar_items_default = [
  { isTitle: true, name: "Main" },
  { name: "Dashboard", url: "index.html", icon: "grid-fill" },
  { name: "Analytics", url: "analytics.html", icon: "bar-chart-line-fill" },
  { isTitle: true, name: "Store Management" },
  { name: "Products", url: "products.html", icon: "box-seam-fill" },
  { name: "Orders", url: "orders.html", icon: "bag-check-fill" },
  { name: "Customers", url: "customers.html", icon: "people-fill" },
  { isTitle: true, name: "System" },
  { name: "Settings", url: "settings.html", icon: "gear-fill" },
  { name: "Profile", url: "account-profile.html", icon: "person-circle" },
  {
    name: "Authentication",
    icon: "person-badge-fill",
    key: "auth",
    submenu: [
      { name: "Login", url: "auth-login.html", submenu: [] },
      { name: "Register", url: "auth-register.html", submenu: [] }
    ]
  }
];

// src/horizontal-menu-items.json
var horizontal_menu_items_default = [
  {
    name: "Dashboard",
    url: "index.html",
    icon: "grid-fill"
  },
  {
    name: "Components",
    key: "component",
    icon: "stack",
    submenu: [
      {
        name: "Alert",
        url: "component-alert.html"
      },
      {
        name: "Badge",
        url: "component-badge.html"
      },
      {
        name: "Breadcrumb",
        url: "component-breadcrumb.html"
      },
      {
        name: "Button",
        url: "component-button.html"
      },
      {
        name: "Card",
        url: "component-card.html"
      },
      {
        name: "Carousel",
        url: "component-carousel.html"
      },
      {
        name: "Collapse",
        url: "component-collapse.html"
      },
      {
        name: "Dropdown",
        url: "component-dropdown.html"
      },
      {
        name: "List Group",
        url: "component-list-group.html"
      },
      {
        name: "Modal",
        url: "component-modal.html"
      },
      {
        name: "Navs",
        url: "component-navs.html"
      },
      {
        name: "Pagination",
        url: "component-pagination.html"
      },
      {
        name: "Progress",
        url: "component-progress.html"
      },
      {
        name: "Spinner",
        url: "component-spinner.html"
      },
      {
        name: "Tooltip",
        url: "component-tooltip.html"
      },
      {
        name: "Extra Components",
        key: "extra-component",
        icon: "collection-fill",
        submenu: [
          {
            name: "Avatar",
            url: "extra-component-avatar.html"
          },
          {
            name: "Comment",
            url: "extra-component-comment.html"
          },
          {
            name: "Sweet Alert",
            url: "extra-component-sweetalert.html"
          },
          {
            name: "Toastify",
            url: "extra-component-toastify.html"
          },
          {
            name: "Rating",
            url: "extra-component-rating.html"
          },
          {
            name: "Divider",
            url: "extra-component-divider.html"
          },
          {
            name: "GLightbox",
            url: "extra-component-glightbox.html"
          }
        ]
      }
    ]
  },
  {
    name: "Layouts",
    key: "layout",
    icon: "grid-1x2-fill",
    submenu: [
      {
        name: "Default Layout",
        url: "layout-default.html"
      },
      {
        name: "1 Column",
        url: "layout-vertical-1-column.html"
      },
      {
        name: "Vertical Navbar",
        url: "layout-vertical-navbar.html"
      },
      {
        name: "RTL Layout",
        url: "layout-rtl.html"
      },
      {
        name: "Horizontal Menu",
        url: "layout-horizontal.html"
      }
    ]
  },
  {
    name: "Forms",
    key: "form",
    icon: "file-earmark-medical-fill",
    submenu: [
      {
        name: "Form Elements",
        key: "form-element",
        icon: "hexagon-fill",
        submenu: [
          {
            name: "Input",
            url: "form-element-input.html"
          },
          {
            name: "Input Group",
            url: "form-element-input-group.html"
          },
          {
            name: "Select",
            url: "form-element-select.html"
          },
          {
            name: "Radio",
            url: "form-element-radio.html"
          },
          {
            name: "Checkbox",
            url: "form-element-checkbox.html"
          },
          {
            name: "Textarea",
            url: "form-element-textarea.html"
          }
        ]
      },
      {
        name: "Form Layout",
        url: "form-layout.html",
        icon: "file-earmark-medical-fill"
      },
      {
        name: "Form Validation",
        icon: "journal-check",
        key: "form-validation",
        submenu: [
          {
            name: "Parsley",
            url: "form-validation-parsley.html"
          }
        ]
      },
      {
        name: "Form Editor",
        icon: "pen-fill",
        key: "form-editor",
        submenu: [
          {
            name: "Quill",
            url: "form-editor-quill.html"
          },
          {
            name: "CKEditor",
            url: "form-editor-ckeditor.html"
          },
          {
            name: "Summernote",
            url: "form-editor-summernote.html"
          },
          {
            name: "TinyMCE",
            url: "form-editor-tinymce.html"
          }
        ]
      }
    ]
  },
  {
    name: "Table",
    icon: "table",
    submenu: [
      {
        name: "Table",
        url: "table.html",
        icon: "file-earmark-spreadsheet-fill"
      },
      {
        name: "Datatable",
        url: "table-datatable.html",
        icon: "file-earmark-spreadsheet-fill"
      },
      {
        name: "Datatable (jQuery)",
        url: "table-datatable-jquery.html",
        icon: "file-earmark-spreadsheet-fill"
      }
    ]
  },
  {
    name: "Extras",
    key: "extras",
    icon: "plus-square-fill",
    submenu: [
      {
        name: "Widgets",
        key: "ui-widgets",
        icon: "pentagon-fill",
        submenu: [
          {
            name: "Chatbox",
            url: "ui-widgets-chatbox.html"
          },
          {
            name: "Pricing",
            url: "ui-widgets-pricing.html"
          },
          {
            name: "To-do List",
            url: "ui-widgets-todolist.html"
          }
        ]
      },
      {
        name: "Icons",
        key: "ui-icons",
        icon: "egg-fill",
        submenu: [
          {
            name: "Bootstrap Icons ",
            url: "ui-icons-bootstrap-icons.html"
          },
          {
            name: "Fontawesome",
            url: "ui-icons-fontawesome.html"
          },
          {
            name: "Dripicons",
            url: "ui-icons-dripicons.html"
          }
        ]
      },
      {
        name: "Charts",
        key: "ui-chart",
        icon: "bar-chart-fill",
        submenu: [
          {
            name: "ChartJS",
            url: "ui-chart-chartjs.html"
          },
          {
            name: "Apexcharts",
            url: "ui-chart-apexcharts.html"
          }
        ]
      }
    ]
  },
  {
    name: "Pages",
    key: "pages",
    icon: "file-earmark-fill",
    submenu: [
      {
        name: "Authentication",
        key: "auth",
        icon: "person-badge-fill",
        submenu: [
          {
            name: "Login",
            url: "auth-login.html"
          },
          {
            name: "Register",
            url: "auth-register.html"
          },
          {
            name: "Forgot Password",
            url: "auth-forgot-password.html"
          }
        ]
      },
      {
        name: "Errors",
        key: "error",
        icon: "x-octagon-fill",
        submenu: [
          {
            name: "403",
            url: "error-403.html"
          },
          {
            name: "404",
            url: "error-404.html"
          },
          {
            name: "500",
            url: "error-500.html"
          }
        ]
      },
      {
        name: "File Uploader",
        key: "ui-file",
        icon: "cloud-arrow-up-fill",
        url: "ui-file-uploader.html"
      },
      {
        name: "Maps",
        key: "ui-map",
        icon: "map-fill",
        submenu: [
          {
            name: "Google Map",
            url: "ui-map-google-map.html"
          },
          {
            name: "JS Vector Map",
            url: "ui-map-jsvectormap.html"
          }
        ]
      },
      {
        name: "Email Application",
        key: "application-email",
        icon: "envelope-fill",
        url: "application-email.html"
      },
      {
        name: "Chat Application",
        key: "application-chat",
        icon: "chat-dots-fill",
        url: "application-chat.html"
      },
      {
        name: "Photo Gallery",
        key: "application-gallery",
        icon: "image-fill",
        url: "application-gallery.html"
      },
      {
        name: "Checkout Page",
        key: "application-checkout",
        icon: "basket-fill",
        url: "application-checkout.html"
      }
    ]
  },
  {
    name: "Support",
    key: "error",
    icon: "life-preserver",
    submenu: [
      {
        name: "Documentation",
        key: "error",
        icon: "life-preserver",
        url: "https://zuramai.github.io/mazer/docs"
      },
      {
        name: "Contribute",
        key: "error",
        url: "https://github.com/zuramai/mazer/blob/main/CONTRIBUTING.md",
        icon: "puzzle"
      },
      {
        name: "Donate",
        key: "error",
        url: "https://github.com/zuramai/mazer#donation",
        icon: "cash"
      }
    ]
  }
];

// vite.config.js
var __vite_injected_original_import_meta_url = "file:///C:/Bootstrap-Task3/vite.config.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var root = resolve(__dirname, "src");
var getFiles = () => {
  let files2 = {};
  fs.readdirSync(root).filter((filename) => filename.endsWith(".html")).forEach((filename) => {
    files2[filename.slice(0, -5)] = resolve(root, filename);
  });
  return files2;
};
var files = getFiles();
var getVariables = (mode) => {
  const variables = {};
  Object.keys(files).forEach((filename) => {
    if (filename.includes("layouts"))
      filename = `layouts/${filename}`;
    variables[filename + ".html"] = {
      web_title: "ShopDash | E-Commerce Dashboard",
      sidebarItems: sidebar_items_default,
      horizontalMenuItems: horizontal_menu_items_default,
      isDev: mode === "development"
    };
  });
  return variables;
};
var modulesToCopy = {
  "@icon/dripicons": false,
  // With dist folder = false
  "@fortawesome/fontawesome-free": false,
  "rater-js": false,
  "bootstrap-icons": false,
  apexcharts: true,
  "perfect-scrollbar": true,
  flatpickr: true,
  filepond: true,
  "filepond-plugin-file-validate-size": true,
  "filepond-plugin-file-validate-type": true,
  "filepond-plugin-image-crop": true,
  "filepond-plugin-image-exif-orientation": true,
  "filepond-plugin-image-filter": true,
  "filepond-plugin-image-preview": true,
  "filepond-plugin-image-resize": true,
  "feather-icons": true,
  dragula: true,
  dayjs: false,
  "chart.js": true,
  "choices.js": false,
  parsleyjs: true,
  sweetalert2: true,
  summernote: true,
  jquery: true,
  quill: true,
  tinymce: false,
  "toastify-js": false,
  "datatables.net": false,
  "datatables.net-bs5": false,
  "simple-datatables": true,
  jsvectormap: true
};
var copyModules = Object.keys(modulesToCopy).map((moduleName) => {
  const withDist = modulesToCopy[moduleName];
  return {
    src: normalizePath(resolve(__dirname, `./node_modules/${moduleName}${withDist ? "/dist" : ""}`)),
    dest: "assets/extensions",
    rename: moduleName
  };
});
build({
  configFile: false,
  build: {
    emptyOutDir: false,
    outDir: resolve(__dirname, "dist/assets/compiled/js"),
    lib: {
      name: "app",
      formats: ["umd"],
      fileName: "app",
      entry: "./src/assets/js/app.js"
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
});
var vite_config_default = defineConfig((env) => ({
  publicDir: "static",
  base: "./",
  root,
  plugins: [
    viteStaticCopy({
      targets: [
        { src: normalizePath(resolve(__dirname, "./src/assets/static")), dest: "assets" },
        { src: normalizePath(resolve(__dirname, "./dist/assets/compiled/fonts")), dest: "assets/compiled/css" },
        { src: normalizePath(resolve(__dirname, "./node_modules/bootstrap-icons/bootstrap-icons.svg")), dest: "assets/static/images" },
        ...copyModules
      ],
      watch: {
        reloadPageOnChange: true
      }
    }),
    nunjucks({
      templatesDir: root,
      variables: getVariables(env.mode),
      nunjucksEnvironment: {
        filters: {
          containString: (str, containStr) => {
            if (!str.length)
              return false;
            return str.indexOf(containStr) >= 0;
          },
          startsWith: (str, targetStr) => {
            if (!str.length)
              return false;
            return str.startsWith(targetStr);
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": normalizePath(resolve(__dirname, "src")),
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
      "~bootstrap-icons": resolve(__dirname, "node_modules/bootstrap-icons"),
      "~perfect-scrollbar": resolve(__dirname, "node_modules/perfect-scrollbar"),
      "~@fontsource": resolve(__dirname, "node_modules/@fontsource")
    }
  },
  build: {
    emptyOutDir: false,
    manifest: true,
    target: "chrome58",
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: files,
      output: {
        entryFileNames: `assets/compiled/js/[name].js`,
        chunkFileNames: `assets/compiled/js/[name].js`,
        assetFileNames: (a) => {
          const extname = a.name.split(".")[1];
          let folder = extname ? `${extname}/` : "";
          if (["woff", "woff2", "ttf"].includes(extname))
            folder = "fonts/";
          return `assets/compiled/${folder}[name][extname]`;
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3NpZGViYXItaXRlbXMuanNvbiIsICJzcmMvaG9yaXpvbnRhbC1tZW51LWl0ZW1zLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxCb290c3RyYXAtVGFzazNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXEJvb3RzdHJhcC1UYXNrM1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovQm9vdHN0cmFwLVRhc2szL3ZpdGUuY29uZmlnLmpzXCI7XHVGRUZGaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBub3JtYWxpemVQYXRoLCBidWlsZCB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgbnVuanVja3MgZnJvbSAndml0ZS1wbHVnaW4tbnVuanVja3MnXHJcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xyXG5pbXBvcnQgc2lkZWJhckl0ZW1zIGZyb20gXCIuL3NyYy9zaWRlYmFyLWl0ZW1zLmpzb25cIlxyXG5pbXBvcnQgaG9yaXpvbnRhbE1lbnVJdGVtcyBmcm9tIFwiLi9zcmMvaG9yaXpvbnRhbC1tZW51LWl0ZW1zLmpzb25cIlxyXG5cclxuY29uc3QgX19maWxlbmFtZSA9IGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKTtcclxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKF9fZmlsZW5hbWUpO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcclxuXHJcbmNvbnN0IGdldEZpbGVzID0gKCkgPT4ge1xyXG4gICAgbGV0IGZpbGVzID0ge31cclxuXHJcbiAgICBmcy5yZWFkZGlyU3luYyhyb290KVxyXG4gICAgICAgIC5maWx0ZXIoZmlsZW5hbWUgPT4gZmlsZW5hbWUuZW5kc1dpdGgoJy5odG1sJykpXHJcbiAgICAgICAgLmZvckVhY2goZmlsZW5hbWUgPT4ge1xyXG4gICAgICAgICAgICBmaWxlc1tmaWxlbmFtZS5zbGljZSgwLCAtNSldID0gcmVzb2x2ZShyb290LCBmaWxlbmFtZSlcclxuICAgICAgICB9KVxyXG4gICAgcmV0dXJuIGZpbGVzXHJcbn1cclxuXHJcbmNvbnN0IGZpbGVzID0gZ2V0RmlsZXMoKVxyXG5cclxuY29uc3QgZ2V0VmFyaWFibGVzID0gKG1vZGUpID0+IHtcclxuICAgIGNvbnN0IHZhcmlhYmxlcyA9IHt9XHJcbiAgICBPYmplY3Qua2V5cyhmaWxlcykuZm9yRWFjaCgoZmlsZW5hbWUpID0+IHtcclxuICAgICAgICBpZiAoZmlsZW5hbWUuaW5jbHVkZXMoJ2xheW91dHMnKSkgZmlsZW5hbWUgPSBgbGF5b3V0cy8ke2ZpbGVuYW1lfWBcclxuICAgICAgICB2YXJpYWJsZXNbZmlsZW5hbWUgKyAnLmh0bWwnXSA9IHtcclxuICAgICAgICAgICAgd2ViX3RpdGxlOiBcIlNob3BEYXNoIHwgRS1Db21tZXJjZSBEYXNoYm9hcmRcIixcclxuICAgICAgICAgICAgc2lkZWJhckl0ZW1zLFxyXG4gICAgICAgICAgICBob3Jpem9udGFsTWVudUl0ZW1zLFxyXG4gICAgICAgICAgICBpc0RldjogbW9kZSA9PT0gJ2RldmVsb3BtZW50J1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gdmFyaWFibGVzXHJcbn1cclxuXHJcbi8vIE1vZHVsZXMgYW5kIGV4dGVuc2lvbnNcclxuLy8gSWYgdGhlIHZhbHVlIGlzIHRydWUsIHRoZW4gaXQgd2lsbCBjb3B5IHRoZSBmaWxlcyBpbnNpZGUgdGhlIGBkaXN0YCBmb2xkZXJzXHJcbi8vIEJ1dCBpZiB0aGUgdmFsdWUgaXMgZmFsc2UsIGl0IHdpbGwgY29weSB0aGUgZW50aXJlIG1vZHVsZSBmaWxlcyBhbmQgZm9sZGVyc1xyXG5jb25zdCBtb2R1bGVzVG9Db3B5ID0ge1xyXG4gICAgXCJAaWNvbi9kcmlwaWNvbnNcIjogZmFsc2UsIC8vIFdpdGggZGlzdCBmb2xkZXIgPSBmYWxzZVxyXG4gICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZVwiOiBmYWxzZSxcclxuICAgIFwicmF0ZXItanNcIjogZmFsc2UsXHJcbiAgICBcImJvb3RzdHJhcC1pY29uc1wiOiBmYWxzZSxcclxuICAgIGFwZXhjaGFydHM6IHRydWUsXHJcbiAgICBcInBlcmZlY3Qtc2Nyb2xsYmFyXCI6IHRydWUsXHJcbiAgICBmbGF0cGlja3I6IHRydWUsXHJcbiAgICBmaWxlcG9uZDogdHJ1ZSxcclxuICAgIFwiZmlsZXBvbmQtcGx1Z2luLWZpbGUtdmFsaWRhdGUtc2l6ZVwiOiB0cnVlLFxyXG4gICAgXCJmaWxlcG9uZC1wbHVnaW4tZmlsZS12YWxpZGF0ZS10eXBlXCI6IHRydWUsIFxyXG4gICAgXCJmaWxlcG9uZC1wbHVnaW4taW1hZ2UtY3JvcFwiOiB0cnVlLFxyXG4gICAgXCJmaWxlcG9uZC1wbHVnaW4taW1hZ2UtZXhpZi1vcmllbnRhdGlvblwiOiB0cnVlLCBcclxuICAgIFwiZmlsZXBvbmQtcGx1Z2luLWltYWdlLWZpbHRlclwiOiB0cnVlLFxyXG4gICAgXCJmaWxlcG9uZC1wbHVnaW4taW1hZ2UtcHJldmlld1wiOiB0cnVlLFxyXG4gICAgXCJmaWxlcG9uZC1wbHVnaW4taW1hZ2UtcmVzaXplXCI6IHRydWUsXHJcbiAgICBcImZlYXRoZXItaWNvbnNcIjogdHJ1ZSxcclxuICAgIGRyYWd1bGE6IHRydWUsXHJcbiAgICBkYXlqczogZmFsc2UsXHJcbiAgICBcImNoYXJ0LmpzXCI6IHRydWUsXHJcbiAgICBcImNob2ljZXMuanNcIjogZmFsc2UsXHJcbiAgICBwYXJzbGV5anM6IHRydWUsXHJcbiAgICBzd2VldGFsZXJ0MjogdHJ1ZSxcclxuICAgIHN1bW1lcm5vdGU6IHRydWUsXHJcbiAgICBqcXVlcnk6IHRydWUsXHJcbiAgICBxdWlsbDogdHJ1ZSxcclxuICAgIHRpbnltY2U6IGZhbHNlLFxyXG4gICAgXCJ0b2FzdGlmeS1qc1wiOiBmYWxzZSxcclxuICAgIFwiZGF0YXRhYmxlcy5uZXRcIjogZmFsc2UsXHJcbiAgICBcImRhdGF0YWJsZXMubmV0LWJzNVwiOiBmYWxzZSxcclxuICAgIFwic2ltcGxlLWRhdGF0YWJsZXNcIjogdHJ1ZSwgXHJcbiAgICBqc3ZlY3Rvcm1hcDogdHJ1ZSxcclxufVxyXG5cclxuY29uc3QgY29weU1vZHVsZXMgPSBPYmplY3Qua2V5cyhtb2R1bGVzVG9Db3B5KS5tYXAobW9kdWxlTmFtZSA9PiB7XHJcbiAgICBjb25zdCB3aXRoRGlzdCA9IG1vZHVsZXNUb0NvcHlbbW9kdWxlTmFtZV1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3JjOiBub3JtYWxpemVQYXRoKHJlc29sdmUoX19kaXJuYW1lLCBgLi9ub2RlX21vZHVsZXMvJHttb2R1bGVOYW1lfSR7d2l0aERpc3QgPyAnL2Rpc3QnIDogJyd9YCkpLFxyXG4gICAgICAgIGRlc3Q6ICdhc3NldHMvZXh0ZW5zaW9ucycsXHJcbiAgICAgICAgcmVuYW1lOiBtb2R1bGVOYW1lXHJcbiAgICB9XHJcbn0pXHJcblxyXG5idWlsZCh7XHJcbiAgICBjb25maWdGaWxlOiBmYWxzZSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxyXG4gICAgICAgIG91dERpcjogcmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0L2Fzc2V0cy9jb21waWxlZC9qcycpLFxyXG4gICAgICAgIGxpYjoge1xyXG4gICAgICAgICAgICBuYW1lOiAnYXBwJyxcclxuICAgICAgICAgICAgZm9ybWF0czogWyd1bWQnXSxcclxuICAgICAgICAgICAgZmlsZU5hbWU6ICdhcHAnLFxyXG4gICAgICAgICAgICBlbnRyeTogJy4vc3JjL2Fzc2V0cy9qcy9hcHAuanMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSlcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChlbnYpID0+ICh7XHJcbiAgICBwdWJsaWNEaXI6ICdzdGF0aWMnLFxyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIHJvb3QsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdml0ZVN0YXRpY0NvcHkoe1xyXG4gICAgICAgICAgICB0YXJnZXRzOiBbXHJcbiAgICAgICAgICAgICAgICB7IHNyYzogbm9ybWFsaXplUGF0aChyZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cy9zdGF0aWMnKSksIGRlc3Q6ICdhc3NldHMnIH0sXHJcbiAgICAgICAgICAgICAgICB7IHNyYzogbm9ybWFsaXplUGF0aChyZXNvbHZlKF9fZGlybmFtZSwgJy4vZGlzdC9hc3NldHMvY29tcGlsZWQvZm9udHMnKSksIGRlc3Q6ICdhc3NldHMvY29tcGlsZWQvY3NzJyB9LFxyXG4gICAgICAgICAgICAgICAgeyBzcmM6IG5vcm1hbGl6ZVBhdGgocmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwLWljb25zL2Jvb3RzdHJhcC1pY29ucy5zdmdcIikpLCBkZXN0OiAnYXNzZXRzL3N0YXRpYy9pbWFnZXMnIH0sXHJcbiAgICAgICAgICAgICAgICAuLi5jb3B5TW9kdWxlc1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB3YXRjaDoge1xyXG4gICAgICAgICAgICAgICAgcmVsb2FkUGFnZU9uQ2hhbmdlOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSxcclxuICAgICAgICBudW5qdWNrcyh7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlc0Rpcjogcm9vdCxcclxuICAgICAgICAgICAgdmFyaWFibGVzOiBnZXRWYXJpYWJsZXMoZW52Lm1vZGUpLFxyXG4gICAgICAgICAgICBudW5qdWNrc0Vudmlyb25tZW50OiB7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5TdHJpbmc6IChzdHIsIGNvbnRhaW5TdHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIubGVuZ3RoKSByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKGNvbnRhaW5TdHIpID49IDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0c1dpdGg6IChzdHIsIHRhcmdldFN0cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0ci5sZW5ndGgpIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnN0YXJ0c1dpdGgodGFyZ2V0U3RyKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICdAJzogbm9ybWFsaXplUGF0aChyZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpKSxcclxuICAgICAgICAgICAgJ35ib290c3RyYXAnOiByZXNvbHZlKF9fZGlybmFtZSwgJ25vZGVfbW9kdWxlcy9ib290c3RyYXAnKSxcclxuICAgICAgICAgICAgJ35ib290c3RyYXAtaWNvbnMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ25vZGVfbW9kdWxlcy9ib290c3RyYXAtaWNvbnMnKSxcclxuICAgICAgICAgICAgJ35wZXJmZWN0LXNjcm9sbGJhcic6IHJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyJyksXHJcbiAgICAgICAgICAgICd+QGZvbnRzb3VyY2UnOiByZXNvbHZlKF9fZGlybmFtZSwgJ25vZGVfbW9kdWxlcy9AZm9udHNvdXJjZScpLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcclxuICAgICAgICBtYW5pZmVzdDogdHJ1ZSxcclxuICAgICAgICB0YXJnZXQ6IFwiY2hyb21lNThcIixcclxuICAgICAgICBvdXREaXI6IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpLFxyXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgaW5wdXQ6IGZpbGVzLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL2NvbXBpbGVkL2pzL1tuYW1lXS5qc2AsXHJcbiAgICAgICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogYGFzc2V0cy9jb21waWxlZC9qcy9bbmFtZV0uanNgLFxyXG5cclxuICAgICAgICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dG5hbWUgPSBhLm5hbWUuc3BsaXQoJy4nKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBleHRuYW1lID8gYCR7ZXh0bmFtZX0vYCA6ICcnXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFB1dCBmb250cyBpbnRvIGNzcyBmb2xkZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoWyd3b2ZmJywgJ3dvZmYyJywgJ3R0ZiddLmluY2x1ZGVzKGV4dG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb2xkZXIgPSAnZm9udHMvJ1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9jb21waWxlZC8ke2ZvbGRlcn1bbmFtZV1bZXh0bmFtZV1gXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59KSlcclxuIiwgIlx1RkVGRltcbiAgeyBcImlzVGl0bGVcIjogdHJ1ZSwgXCJuYW1lXCI6IFwiTWFpblwiIH0sXG4gIHsgXCJuYW1lXCI6IFwiRGFzaGJvYXJkXCIsIFwidXJsXCI6IFwiaW5kZXguaHRtbFwiLCBcImljb25cIjogXCJncmlkLWZpbGxcIiB9LFxuICB7IFwibmFtZVwiOiBcIkFuYWx5dGljc1wiLCBcInVybFwiOiBcImFuYWx5dGljcy5odG1sXCIsIFwiaWNvblwiOiBcImJhci1jaGFydC1saW5lLWZpbGxcIiB9LFxuICB7IFwiaXNUaXRsZVwiOiB0cnVlLCBcIm5hbWVcIjogXCJTdG9yZSBNYW5hZ2VtZW50XCIgfSxcbiAgeyBcIm5hbWVcIjogXCJQcm9kdWN0c1wiLCBcInVybFwiOiBcInByb2R1Y3RzLmh0bWxcIiwgXCJpY29uXCI6IFwiYm94LXNlYW0tZmlsbFwiIH0sXG4gIHsgXCJuYW1lXCI6IFwiT3JkZXJzXCIsIFwidXJsXCI6IFwib3JkZXJzLmh0bWxcIiwgXCJpY29uXCI6IFwiYmFnLWNoZWNrLWZpbGxcIiB9LFxuICB7IFwibmFtZVwiOiBcIkN1c3RvbWVyc1wiLCBcInVybFwiOiBcImN1c3RvbWVycy5odG1sXCIsIFwiaWNvblwiOiBcInBlb3BsZS1maWxsXCIgfSxcbiAgeyBcImlzVGl0bGVcIjogdHJ1ZSwgXCJuYW1lXCI6IFwiU3lzdGVtXCIgfSxcbiAgeyBcIm5hbWVcIjogXCJTZXR0aW5nc1wiLCBcInVybFwiOiBcInNldHRpbmdzLmh0bWxcIiwgXCJpY29uXCI6IFwiZ2Vhci1maWxsXCIgfSxcbiAgeyBcIm5hbWVcIjogXCJQcm9maWxlXCIsIFwidXJsXCI6IFwiYWNjb3VudC1wcm9maWxlLmh0bWxcIiwgXCJpY29uXCI6IFwicGVyc29uLWNpcmNsZVwiIH0sXG4gIHtcbiAgICBcIm5hbWVcIjogXCJBdXRoZW50aWNhdGlvblwiLCBcImljb25cIjogXCJwZXJzb24tYmFkZ2UtZmlsbFwiLCBcImtleVwiOiBcImF1dGhcIixcbiAgICBcInN1Ym1lbnVcIjogW1xuICAgICAgeyBcIm5hbWVcIjogXCJMb2dpblwiLCBcInVybFwiOiBcImF1dGgtbG9naW4uaHRtbFwiLCBcInN1Ym1lbnVcIjogW10gfSxcbiAgICAgIHsgXCJuYW1lXCI6IFwiUmVnaXN0ZXJcIiwgXCJ1cmxcIjogXCJhdXRoLXJlZ2lzdGVyLmh0bWxcIiwgXCJzdWJtZW51XCI6IFtdIH1cbiAgICBdXG4gIH1cbl1cclxuIiwgIltcclxuXHR7XHJcblx0XHRcIm5hbWVcIjogXCJEYXNoYm9hcmRcIixcclxuXHRcdFwidXJsXCI6IFwiaW5kZXguaHRtbFwiLFxyXG5cdFx0XCJpY29uXCI6IFwiZ3JpZC1maWxsXCJcclxuXHR9LFxyXG5cdHtcclxuXHRcdFwibmFtZVwiOiBcIkNvbXBvbmVudHNcIixcclxuXHRcdFwia2V5XCI6IFwiY29tcG9uZW50XCIsXHJcblx0XHRcImljb25cIjogXCJzdGFja1wiLFxyXG5cdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkFsZXJ0XCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJjb21wb25lbnQtYWxlcnQuaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJCYWRnZVwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiY29tcG9uZW50LWJhZGdlLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiQnJlYWRjcnVtYlwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiY29tcG9uZW50LWJyZWFkY3J1bWIuaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJCdXR0b25cIixcclxuXHRcdFx0XHRcInVybFwiOiBcImNvbXBvbmVudC1idXR0b24uaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJDYXJkXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJjb21wb25lbnQtY2FyZC5odG1sXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkNhcm91c2VsXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJjb21wb25lbnQtY2Fyb3VzZWwuaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJDb2xsYXBzZVwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiY29tcG9uZW50LWNvbGxhcHNlLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRHJvcGRvd25cIixcclxuXHRcdFx0XHRcInVybFwiOiBcImNvbXBvbmVudC1kcm9wZG93bi5odG1sXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkxpc3QgR3JvdXBcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImNvbXBvbmVudC1saXN0LWdyb3VwLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiTW9kYWxcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImNvbXBvbmVudC1tb2RhbC5odG1sXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIk5hdnNcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImNvbXBvbmVudC1uYXZzLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiUGFnaW5hdGlvblwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiY29tcG9uZW50LXBhZ2luYXRpb24uaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJQcm9ncmVzc1wiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiY29tcG9uZW50LXByb2dyZXNzLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiU3Bpbm5lclwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiY29tcG9uZW50LXNwaW5uZXIuaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJUb29sdGlwXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJjb21wb25lbnQtdG9vbHRpcC5odG1sXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkV4dHJhIENvbXBvbmVudHNcIixcclxuXHRcdFx0XHRcImtleVwiOiBcImV4dHJhLWNvbXBvbmVudFwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImNvbGxlY3Rpb24tZmlsbFwiLFxyXG5cdFx0XHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIkF2YXRhclwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImV4dHJhLWNvbXBvbmVudC1hdmF0YXIuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJDb21tZW50XCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZXh0cmEtY29tcG9uZW50LWNvbW1lbnQuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJTd2VldCBBbGVydFwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImV4dHJhLWNvbXBvbmVudC1zd2VldGFsZXJ0Lmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiVG9hc3RpZnlcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJleHRyYS1jb21wb25lbnQtdG9hc3RpZnkuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJSYXRpbmdcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJleHRyYS1jb21wb25lbnQtcmF0aW5nLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiRGl2aWRlclwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImV4dHJhLWNvbXBvbmVudC1kaXZpZGVyLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiR0xpZ2h0Ym94XCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZXh0cmEtY29tcG9uZW50LWdsaWdodGJveC5odG1sXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9LFxyXG5cdHtcclxuXHRcdFwibmFtZVwiOiBcIkxheW91dHNcIixcclxuXHRcdFwia2V5XCI6IFwibGF5b3V0XCIsXHJcblx0XHRcImljb25cIjogXCJncmlkLTF4Mi1maWxsXCIsXHJcblx0XHRcInN1Ym1lbnVcIjogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRGVmYXVsdCBMYXlvdXRcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImxheW91dC1kZWZhdWx0Lmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiMSBDb2x1bW5cIixcclxuXHRcdFx0XHRcInVybFwiOiBcImxheW91dC12ZXJ0aWNhbC0xLWNvbHVtbi5odG1sXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIlZlcnRpY2FsIE5hdmJhclwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwibGF5b3V0LXZlcnRpY2FsLW5hdmJhci5odG1sXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIlJUTCBMYXlvdXRcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImxheW91dC1ydGwuaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJIb3Jpem9udGFsIE1lbnVcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImxheW91dC1ob3Jpem9udGFsLmh0bWxcIlxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSxcclxuXHR7XHJcblx0XHRcIm5hbWVcIjogXCJGb3Jtc1wiLFxyXG5cdFx0XCJrZXlcIjogXCJmb3JtXCIsXHJcblx0XHRcImljb25cIjogXCJmaWxlLWVhcm1hcmstbWVkaWNhbC1maWxsXCIsXHJcblx0XHRcInN1Ym1lbnVcIjogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRm9ybSBFbGVtZW50c1wiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwiZm9ybS1lbGVtZW50XCIsXHJcblx0XHRcdFx0XCJpY29uXCI6IFwiaGV4YWdvbi1maWxsXCIsXHJcblx0XHRcdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiSW5wdXRcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJmb3JtLWVsZW1lbnQtaW5wdXQuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJJbnB1dCBHcm91cFwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImZvcm0tZWxlbWVudC1pbnB1dC1ncm91cC5odG1sXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIlNlbGVjdFwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImZvcm0tZWxlbWVudC1zZWxlY3QuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJSYWRpb1wiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImZvcm0tZWxlbWVudC1yYWRpby5odG1sXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIkNoZWNrYm94XCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZm9ybS1lbGVtZW50LWNoZWNrYm94Lmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiVGV4dGFyZWFcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJmb3JtLWVsZW1lbnQtdGV4dGFyZWEuaHRtbFwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRm9ybSBMYXlvdXRcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImZvcm0tbGF5b3V0Lmh0bWxcIixcclxuXHRcdFx0XHRcImljb25cIjogXCJmaWxlLWVhcm1hcmstbWVkaWNhbC1maWxsXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkZvcm0gVmFsaWRhdGlvblwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImpvdXJuYWwtY2hlY2tcIixcclxuXHRcdFx0XHRcImtleVwiOiBcImZvcm0tdmFsaWRhdGlvblwiLFxyXG5cdFx0XHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIlBhcnNsZXlcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJmb3JtLXZhbGlkYXRpb24tcGFyc2xleS5odG1sXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJGb3JtIEVkaXRvclwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcInBlbi1maWxsXCIsXHJcblx0XHRcdFx0XCJrZXlcIjogXCJmb3JtLWVkaXRvclwiLFxyXG5cdFx0XHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIlF1aWxsXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZm9ybS1lZGl0b3ItcXVpbGwuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJDS0VkaXRvclwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImZvcm0tZWRpdG9yLWNrZWRpdG9yLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiU3VtbWVybm90ZVwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcImZvcm0tZWRpdG9yLXN1bW1lcm5vdGUuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJUaW55TUNFXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZm9ybS1lZGl0b3ItdGlueW1jZS5odG1sXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdF1cclxuXHR9LFxyXG5cdHtcclxuXHRcdFwibmFtZVwiOiBcIlRhYmxlXCIsXHJcblx0XHRcImljb25cIjogXCJ0YWJsZVwiLFxyXG5cdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIlRhYmxlXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJ0YWJsZS5odG1sXCIsXHJcblx0XHRcdFx0XCJpY29uXCI6IFwiZmlsZS1lYXJtYXJrLXNwcmVhZHNoZWV0LWZpbGxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRGF0YXRhYmxlXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJ0YWJsZS1kYXRhdGFibGUuaHRtbFwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImZpbGUtZWFybWFyay1zcHJlYWRzaGVldC1maWxsXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkRhdGF0YWJsZSAoalF1ZXJ5KVwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwidGFibGUtZGF0YXRhYmxlLWpxdWVyeS5odG1sXCIsXHJcblx0XHRcdFx0XCJpY29uXCI6IFwiZmlsZS1lYXJtYXJrLXNwcmVhZHNoZWV0LWZpbGxcIlxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSxcclxuXHJcblx0e1xyXG5cdFx0XCJuYW1lXCI6IFwiRXh0cmFzXCIsXHJcblx0XHRcImtleVwiOiBcImV4dHJhc1wiLFxyXG5cdFx0XCJpY29uXCI6IFwicGx1cy1zcXVhcmUtZmlsbFwiLFxyXG5cdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIldpZGdldHNcIixcclxuXHRcdFx0XHRcImtleVwiOiBcInVpLXdpZGdldHNcIixcclxuXHRcdFx0XHRcImljb25cIjogXCJwZW50YWdvbi1maWxsXCIsXHJcblx0XHRcdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiQ2hhdGJveFwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcInVpLXdpZGdldHMtY2hhdGJveC5odG1sXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIlByaWNpbmdcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJ1aS13aWRnZXRzLXByaWNpbmcuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJUby1kbyBMaXN0XCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwidWktd2lkZ2V0cy10b2RvbGlzdC5odG1sXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJJY29uc1wiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwidWktaWNvbnNcIixcclxuXHRcdFx0XHRcImljb25cIjogXCJlZ2ctZmlsbFwiLFxyXG5cdFx0XHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIkJvb3RzdHJhcCBJY29ucyBcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJ1aS1pY29ucy1ib290c3RyYXAtaWNvbnMuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJGb250YXdlc29tZVwiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcInVpLWljb25zLWZvbnRhd2Vzb21lLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiRHJpcGljb25zXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwidWktaWNvbnMtZHJpcGljb25zLmh0bWxcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkNoYXJ0c1wiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwidWktY2hhcnRcIixcclxuXHRcdFx0XHRcImljb25cIjogXCJiYXItY2hhcnQtZmlsbFwiLFxyXG5cdFx0XHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFwibmFtZVwiOiBcIkNoYXJ0SlNcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJ1aS1jaGFydC1jaGFydGpzLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiQXBleGNoYXJ0c1wiLFxyXG5cdFx0XHRcdFx0XHRcInVybFwiOiBcInVpLWNoYXJ0LWFwZXhjaGFydHMuaHRtbFwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblx0fSxcclxuXHR7XHJcblx0XHRcIm5hbWVcIjogXCJQYWdlc1wiLFxyXG5cdFx0XCJrZXlcIjogXCJwYWdlc1wiLFxyXG5cdFx0XCJpY29uXCI6IFwiZmlsZS1lYXJtYXJrLWZpbGxcIixcclxuXHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJBdXRoZW50aWNhdGlvblwiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwiYXV0aFwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcInBlcnNvbi1iYWRnZS1maWxsXCIsXHJcblx0XHRcdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiTG9naW5cIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJhdXRoLWxvZ2luLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiUmVnaXN0ZXJcIixcclxuXHRcdFx0XHRcdFx0XCJ1cmxcIjogXCJhdXRoLXJlZ2lzdGVyLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiRm9yZ290IFBhc3N3b3JkXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiYXV0aC1mb3Jnb3QtcGFzc3dvcmQuaHRtbFwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRXJyb3JzXCIsXHJcblx0XHRcdFx0XCJrZXlcIjogXCJlcnJvclwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcIngtb2N0YWdvbi1maWxsXCIsXHJcblx0XHRcdFx0XCJzdWJtZW51XCI6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiNDAzXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZXJyb3ItNDAzLmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiNDA0XCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZXJyb3ItNDA0Lmh0bWxcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XCJuYW1lXCI6IFwiNTAwXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwiZXJyb3ItNTAwLmh0bWxcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkZpbGUgVXBsb2FkZXJcIixcclxuXHRcdFx0XHRcImtleVwiOiBcInVpLWZpbGVcIixcclxuXHRcdFx0XHRcImljb25cIjogXCJjbG91ZC1hcnJvdy11cC1maWxsXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJ1aS1maWxlLXVwbG9hZGVyLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiTWFwc1wiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwidWktbWFwXCIsXHJcblx0XHRcdFx0XCJpY29uXCI6IFwibWFwLWZpbGxcIixcclxuXHRcdFx0XHRcInN1Ym1lbnVcIjogW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJHb29nbGUgTWFwXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwidWktbWFwLWdvb2dsZS1tYXAuaHRtbFwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcIm5hbWVcIjogXCJKUyBWZWN0b3IgTWFwXCIsXHJcblx0XHRcdFx0XHRcdFwidXJsXCI6IFwidWktbWFwLWpzdmVjdG9ybWFwLmh0bWxcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwibmFtZVwiOiBcIkVtYWlsIEFwcGxpY2F0aW9uXCIsXHJcblx0XHRcdFx0XCJrZXlcIjogXCJhcHBsaWNhdGlvbi1lbWFpbFwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImVudmVsb3BlLWZpbGxcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImFwcGxpY2F0aW9uLWVtYWlsLmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiQ2hhdCBBcHBsaWNhdGlvblwiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwiYXBwbGljYXRpb24tY2hhdFwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImNoYXQtZG90cy1maWxsXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJhcHBsaWNhdGlvbi1jaGF0Lmh0bWxcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiUGhvdG8gR2FsbGVyeVwiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwiYXBwbGljYXRpb24tZ2FsbGVyeVwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImltYWdlLWZpbGxcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImFwcGxpY2F0aW9uLWdhbGxlcnkuaHRtbFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJDaGVja291dCBQYWdlXCIsXHJcblx0XHRcdFx0XCJrZXlcIjogXCJhcHBsaWNhdGlvbi1jaGVja291dFwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImJhc2tldC1maWxsXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJhcHBsaWNhdGlvbi1jaGVja291dC5odG1sXCJcclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cdH0sXHJcblx0e1xyXG5cdFx0XCJuYW1lXCI6IFwiU3VwcG9ydFwiLFxyXG5cdFx0XCJrZXlcIjogXCJlcnJvclwiLFxyXG5cdFx0XCJpY29uXCI6IFwibGlmZS1wcmVzZXJ2ZXJcIixcclxuXHRcdFwic3VibWVudVwiOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWVcIjogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XCJrZXlcIjogXCJlcnJvclwiLFxyXG5cdFx0XHRcdFwiaWNvblwiOiBcImxpZmUtcHJlc2VydmVyXCIsXHJcblx0XHRcdFx0XCJ1cmxcIjogXCJodHRwczovL3p1cmFtYWkuZ2l0aHViLmlvL21hemVyL2RvY3NcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiQ29udHJpYnV0ZVwiLFxyXG5cdFx0XHRcdFwia2V5XCI6IFwiZXJyb3JcIixcclxuXHRcdFx0XHRcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS96dXJhbWFpL21hemVyL2Jsb2IvbWFpbi9DT05UUklCVVRJTkcubWRcIixcclxuXHRcdFx0XHRcImljb25cIjogXCJwdXp6bGVcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJuYW1lXCI6IFwiRG9uYXRlXCIsXHJcblx0XHRcdFx0XCJrZXlcIjogXCJlcnJvclwiLFxyXG5cdFx0XHRcdFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3p1cmFtYWkvbWF6ZXIjZG9uYXRpb25cIixcclxuXHRcdFx0XHRcImljb25cIjogXCJjYXNoXCJcclxuXHRcdFx0fVxyXG5cdFx0XVxyXG5cdH1cclxuXVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZPLFNBQVMsY0FBYyxlQUFlLGFBQWE7QUFDaFMsT0FBTyxRQUFRO0FBQ2YsT0FBTyxRQUFRLGVBQWU7QUFDOUIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxjQUFjO0FBQ3JCLFNBQVMsc0JBQXNCOzs7QUNMOUI7QUFBQSxFQUNDLEVBQUUsU0FBVyxNQUFNLE1BQVEsT0FBTztBQUFBLEVBQ2xDLEVBQUUsTUFBUSxhQUFhLEtBQU8sY0FBYyxNQUFRLFlBQVk7QUFBQSxFQUNoRSxFQUFFLE1BQVEsYUFBYSxLQUFPLGtCQUFrQixNQUFRLHNCQUFzQjtBQUFBLEVBQzlFLEVBQUUsU0FBVyxNQUFNLE1BQVEsbUJBQW1CO0FBQUEsRUFDOUMsRUFBRSxNQUFRLFlBQVksS0FBTyxpQkFBaUIsTUFBUSxnQkFBZ0I7QUFBQSxFQUN0RSxFQUFFLE1BQVEsVUFBVSxLQUFPLGVBQWUsTUFBUSxpQkFBaUI7QUFBQSxFQUNuRSxFQUFFLE1BQVEsYUFBYSxLQUFPLGtCQUFrQixNQUFRLGNBQWM7QUFBQSxFQUN0RSxFQUFFLFNBQVcsTUFBTSxNQUFRLFNBQVM7QUFBQSxFQUNwQyxFQUFFLE1BQVEsWUFBWSxLQUFPLGlCQUFpQixNQUFRLFlBQVk7QUFBQSxFQUNsRSxFQUFFLE1BQVEsV0FBVyxLQUFPLHdCQUF3QixNQUFRLGdCQUFnQjtBQUFBLEVBQzVFO0FBQUEsSUFDRSxNQUFRO0FBQUEsSUFBa0IsTUFBUTtBQUFBLElBQXFCLEtBQU87QUFBQSxJQUM5RCxTQUFXO0FBQUEsTUFDVCxFQUFFLE1BQVEsU0FBUyxLQUFPLG1CQUFtQixTQUFXLENBQUMsRUFBRTtBQUFBLE1BQzNELEVBQUUsTUFBUSxZQUFZLEtBQU8sc0JBQXNCLFNBQVcsQ0FBQyxFQUFFO0FBQUEsSUFDbkU7QUFBQSxFQUNGO0FBQ0Y7OztBQ2xCQTtBQUFBLEVBQ0M7QUFBQSxJQUNDLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxJQUNQLE1BQVE7QUFBQSxFQUNUO0FBQUEsRUFDQTtBQUFBLElBQ0MsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLElBQ1AsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLE1BQ1Y7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxRQUNSLFNBQVc7QUFBQSxVQUNWO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBO0FBQUEsSUFDQyxNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsSUFDUCxNQUFRO0FBQUEsSUFDUixTQUFXO0FBQUEsTUFDVjtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQTtBQUFBLElBQ0MsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLElBQ1AsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLE1BQ1Y7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxRQUNSLFNBQVc7QUFBQSxVQUNWO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLFFBQ1AsU0FBVztBQUFBLFVBQ1Y7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsUUFDUCxTQUFXO0FBQUEsVUFDVjtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQTtBQUFBLElBQ0MsTUFBUTtBQUFBLElBQ1IsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLE1BQ1Y7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLFFBQ0MsTUFBUTtBQUFBLFFBQ1IsS0FBTztBQUFBLFFBQ1AsTUFBUTtBQUFBLE1BQ1Q7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsUUFDUCxNQUFRO0FBQUEsTUFDVDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFFQTtBQUFBLElBQ0MsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLElBQ1AsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLE1BQ1Y7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxRQUNSLFNBQVc7QUFBQSxVQUNWO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxRQUNSLFNBQVc7QUFBQSxVQUNWO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxRQUNSLFNBQVc7QUFBQSxVQUNWO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0E7QUFBQSxJQUNDLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxJQUNQLE1BQVE7QUFBQSxJQUNSLFNBQVc7QUFBQSxNQUNWO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsUUFDUCxNQUFRO0FBQUEsUUFDUixTQUFXO0FBQUEsVUFDVjtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsUUFDUCxNQUFRO0FBQUEsUUFDUixTQUFXO0FBQUEsVUFDVjtBQUFBLFlBQ0MsTUFBUTtBQUFBLFlBQ1IsS0FBTztBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsUUFDUCxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQLE1BQVE7QUFBQSxRQUNSLFNBQVc7QUFBQSxVQUNWO0FBQUEsWUFDQyxNQUFRO0FBQUEsWUFDUixLQUFPO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNDLE1BQVE7QUFBQSxZQUNSLEtBQU87QUFBQSxVQUNSO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBO0FBQUEsUUFDQyxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsUUFDUCxNQUFRO0FBQUEsUUFDUixLQUFPO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNDLE1BQVE7QUFBQSxRQUNSLEtBQU87QUFBQSxRQUNQ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
